package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionService;
import com.du.yiit.examReady.question.QuestionWithoutCorrectDTO;
import com.du.yiit.examReady.utils.PromptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;

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

    @GetMapping("/create")
    public ResponseEntity<CreateExamResponse> create(@RequestParam String examName, @RequestParam boolean isExamDurationAuto, @RequestParam int examDuration, @RequestParam String promptText, @RequestParam int questionSize, @RequestParam String userId, @RequestParam String examColor) {
        int exam_id = examService.createExam(examName, isExamDurationAuto, examDuration, questionSize, promptText, userId, examColor);
        ExamWithoutPromptDTO examWithoutPromptDTO = new ExamWithoutPromptDTO(examRepository.getById(exam_id));
        Mono<Question[]> monoQuestions = promptService.generateQuestions(promptText, questionSize, exam_id);
        Question[] questions = monoQuestions.block();
        List<QuestionWithoutCorrectDTO> questionWithoutCorrectDTOS = new ArrayList<QuestionWithoutCorrectDTO>();
        for (Question question : questions) {
            QuestionWithoutCorrectDTO questionWithoutCorrectDTO = new QuestionWithoutCorrectDTO(question);
            questionWithoutCorrectDTOS.add(questionWithoutCorrectDTO);
        }
        return ResponseEntity.ok(new CreateExamResponse(examWithoutPromptDTO,questionWithoutCorrectDTOS));
    }



}
