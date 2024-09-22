package com.du.yiit.examReady.utils;

import com.du.yiit.examReady.exam.Exam;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class ExamUtils {
    @Autowired
    QuestionRepository questionRepository;

    public ExamUtils(){}
    public int getNumberOfAnswered(Exam exam){
        int numberOfAnswered=0;
        List<Question> questions=questionRepository.findByExamId(exam.getId());

        for (Question question: questions){
            if(!question.getSelected().equals(null)){
                numberOfAnswered++;
            }
        }
        return numberOfAnswered;
    }

    public int getNumberOfCorrectAnswers(List<Question> questions){
        int numberOfCorrectAnswers=0;
        for(Question question:questions){
            if(isCorrect(question)){
                numberOfCorrectAnswers++;
            }
        }
        return numberOfCorrectAnswers;
    }
    public boolean isCorrect(Question question){
        if(question.getSelected().equals(question.getCorrectAnswer())){
            return true;
        }
        else return false;
    }
}
