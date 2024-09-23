package com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation;

import com.du.yiit.examReady.exam.Exam;
import com.du.yiit.examReady.exam.ExamRepository;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionRepository;
import com.du.yiit.examReady.utils.ExamUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class EvaluationWithNegativeMarkingStrategy implements EvaluationStrategy{

    @Autowired
    ExamRepository examRepository;
    @Autowired
    QuestionRepository questionRepository;
    @Override
    public double evaluate(int examId) {
        Exam exam = examRepository.getById(examId);
        List<Question> questions = questionRepository.findByExamId(examId);
        double score=0;
        ExamUtils examUtils=new ExamUtils();

        int numberOfCorrectAnswers = examUtils.getNumberOfCorrectAnswers(questions);
        int numberOfIncorrectAnswers = exam.getQuestionSize()-numberOfCorrectAnswers;

        score = numberOfCorrectAnswers - 0.25*numberOfIncorrectAnswers;
        return score;
    }
}
