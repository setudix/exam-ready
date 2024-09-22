package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.exam.ExamSubmission.ExamResponseWithCorrectAnswer;
import com.du.yiit.examReady.exam.ExamSubmission.SubmittedExamDTO;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionRepository;
import com.du.yiit.examReady.question.QuestionService;
import com.du.yiit.examReady.question.QuestionWithoutCorrectDTO;
import com.du.yiit.examReady.utils.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

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
    public ResponseEntity<ExamResponseWithCorrectAnswer> submitExam(@RequestBody SubmittedExamDTO submittedExamDTO) {
        questionService.updateQuestionAnswers(submittedExamDTO);
        int examId = submittedExamDTO.getExamId();
        Optional<Exam> optionalExam = examRepository.findById(examId);
        Exam exam = optionalExam.get();

        var questionWithCorrectDTOS = questionService.getDTOList(submittedExamDTO);
        return ResponseEntity.ok(new ExamResponseWithCorrectAnswer(exam, questionWithCorrectDTOS));
    }

}
