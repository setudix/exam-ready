package com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation;

import com.du.yiit.examReady.exam.Exam;
import com.du.yiit.examReady.exam.ExamRepository;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionRepository;
import com.du.yiit.examReady.utils.ExamUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class EvaluationWithNegativeMarkingStrategy implements EvaluationStrategy{

    @Autowired
    ExamRepository examRepository;
    @Autowired
    QuestionRepository questionRepository;

    public EvaluationWithNegativeMarkingStrategy(ExamRepository examRepository, QuestionRepository questionRepository) {
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public double evaluate(int examId) {
        Exam exam = examRepository.getById(examId);
        List<Question> questions = questionRepository.findByExamId(examId);

        double score=0;
        ExamUtils examUtils=new ExamUtils(questionRepository);
        exam.setNumberOfCorrect(examUtils.getNumberOfCorrectAnswers(questions));
        examRepository.save(exam);
        int numberOfCorrectAnswers = examUtils.getNumberOfCorrectAnswers(questions);
        int numberOfIncorrectAnswers = examUtils.getNumberOfAnswered(exam)-numberOfCorrectAnswers;

        score = numberOfCorrectAnswers - 0.25*numberOfIncorrectAnswers;
        return score;
    }
}
