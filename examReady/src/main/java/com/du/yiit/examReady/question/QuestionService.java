package com.du.yiit.examReady.question;

import com.du.yiit.examReady.exam.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    @Autowired
    QuestionRepository questionRepository;
    @Autowired
    ExamRepository examRepository;

    public QuestionService(QuestionRepository questionRepository, ExamRepository examRepository){
        this.questionRepository=questionRepository;
        this.examRepository=examRepository;
    }

    public void createQuestion(Question question, int exam_id){
        question.setExam(this.examRepository.getById(exam_id));
        question.setSelected(null);
        questionRepository.save(question);
    }
}
