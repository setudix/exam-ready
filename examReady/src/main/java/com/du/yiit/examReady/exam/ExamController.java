package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation.EvaluationWithNegativeMarkingStrategy;
import com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation.EvaluationWithoutNegativeMarkingStrategy;
import com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation.PerformanceEvaluator;
import com.du.yiit.examReady.exam.ExamSubmission.ExamResponseWithCorrectAnswer;
import com.du.yiit.examReady.exam.ExamSubmission.SubmittedExamDTO;
import com.du.yiit.examReady.question.*;
import com.du.yiit.examReady.utils.ExamUtils;
import com.du.yiit.examReady.utils.JwtTokenService;
import com.du.yiit.examReady.utils.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/exam")
public class ExamController {
    @Autowired
    ExamService examService;
    @Autowired
    QuestionService questionService;
    @Autowired
    PromptService promptService;
    @Autowired
    ExamRepository examRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    JwtTokenService jwtTokenService;

    @PostMapping("/create")
    public ResponseEntity<CreateExamResponse> create(@RequestBody ExamRequestDTO examRequestDTO){
        int exam_id = examService.createExam(examRequestDTO);
        ExamWithoutPromptDTO examWithoutPromptDTO = new ExamWithoutPromptDTO(examRepository.getById(exam_id));
        Mono<Question[]> monoQuestions = promptService.generateQuestions(examRequestDTO.getPromptText(), examRequestDTO.getQuestionSize(), exam_id);
        Question[] questions = monoQuestions.block();
        List<QuestionWithoutCorrectDTO> questionWithoutCorrectDTOS = new ArrayList<QuestionWithoutCorrectDTO>();
        for (Question question : questions) {
            QuestionWithoutCorrectDTO questionWithoutCorrectDTO = new QuestionWithoutCorrectDTO(question);
            questionWithoutCorrectDTOS.add(questionWithoutCorrectDTO);
        }
        return ResponseEntity.ok(new CreateExamResponse(examWithoutPromptDTO,questionWithoutCorrectDTOS));
    }


    @PostMapping("/submit-exam")
    public ResponseEntity<ExamResultDTO> submitExam(@RequestBody SubmittedExamDTO submittedExamDTO) {
        int examId = submittedExamDTO.getExamId();
        Optional<Exam> optionalExam = examRepository.findById(examId);
        Exam exam = optionalExam.get();

        if(exam.isTaken()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        questionService.updateQuestionAnswers(submittedExamDTO);
        exam.setTaken(true);
        Instant now = Instant.now();
        exam.setSubmissionDate(now.getEpochSecond());
        examRepository.save(exam);
        //var questionWithCorrectDTOS = questionService.getDTOList(submittedExamDTO);
        return ResponseEntity.ok(new ExamResultDTO(examId));
    }

    @GetMapping
    public ResponseEntity<ExamResponseDTO> getExamById(@RequestParam("id") int examId,@RequestHeader(value ="Authorization", required = false) String authHeader){

//        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//        }
        Optional<Exam> optionalExam = examRepository.findById(examId);
        Exam exam = optionalExam.get();
        String token = authHeader.substring(7);
//        if (jwtTokenService.validateToken(token)){
//            String userId = jwtTokenService.getUserIdFromToken(token);
//            if(!userId.equals(exam.getUser().getId())){
//                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
//            }}

        ExamUtils examUtils=new ExamUtils(questionRepository);
        exam.setNumberOfAnswered(examUtils.getNumberOfAnswered(exam));
        PerformanceEvaluator performanceEvaluator=new PerformanceEvaluator();
        if(exam.isAllowNegativeMarking()){
            performanceEvaluator.setEvaluationStrategy(new EvaluationWithNegativeMarkingStrategy(examRepository,questionRepository));
        }
        else{
            performanceEvaluator.setEvaluationStrategy(new EvaluationWithoutNegativeMarkingStrategy(examRepository,questionRepository));
        }
        exam.setScore(performanceEvaluator.getEvaluation(examId));
        List<Question> questions=new ArrayList<Question>();
        questions=questionRepository.findByExamId(examId);
        List<QuestionWithoutExam> questionWithoutExams=new ArrayList<QuestionWithoutExam>();
        for(Question question:questions){
            questionWithoutExams.add(new QuestionWithoutExam(question));
        }

        ExamWithoutUserDTO examWithoutUserDTO=new ExamWithoutUserDTO(exam);

        return ResponseEntity.ok(new ExamResponseDTO(examWithoutUserDTO,questionWithoutExams));

    }

    @GetMapping ("get-by-userid")
    public ResponseEntity<List<ExamResponseDTO>> getExamsByUserId(@RequestHeader(value ="Authorization", required = false) String authHeader){
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        if (jwtTokenService.validateToken(token)){
            String userId = jwtTokenService.getUserIdFromToken(token);
            List<Exam> exams=new ArrayList<Exam>();
            exams=examRepository.findByUserId(userId);
            List<ExamResponseDTO> examResponseDTOS=new ArrayList<ExamResponseDTO>();

            for(Exam exam:exams){
                ExamWithoutUserDTO examWithoutUserDTO=new ExamWithoutUserDTO(exam);
                List<Question> questions=new ArrayList<Question>();
                questions=questionRepository.findByExamId(exam.getId());
                List<QuestionWithoutExam> questionWithoutExams=new ArrayList<QuestionWithoutExam>();
                for(Question question:questions){
                    questionWithoutExams.add(new QuestionWithoutExam(question));
                }
                examResponseDTOS.add(new ExamResponseDTO(examWithoutUserDTO,questionWithoutExams));
            }
            return ResponseEntity.ok(examResponseDTOS);
        }


        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
