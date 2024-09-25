package com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation;

import com.du.yiit.examReady.exam.Exam;
import com.du.yiit.examReady.exam.ExamRepository;
import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionRepository;
import com.du.yiit.examReady.utils.ExamUtils;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class EvaluationWithoutNegativeMarkingStrategy implements EvaluationStrategy {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    QuestionRepository questionRepository;

    public EvaluationWithoutNegativeMarkingStrategy(ExamRepository examRepository, QuestionRepository questionRepository) {
        this.examRepository = examRepository;
        this.questionRepository = questionRepository;
    }

    @Override
    public double evaluate(int examId) {
        List<Question> questions = questionRepository.findByExamId(examId);
        ExamUtils examUtils=new ExamUtils(questionRepository);
        Optional<Exam> optionalExam=examRepository.findById(examId);
        Exam exam=optionalExam.get();
        exam.setNumberOfCorrect(examUtils.getNumberOfCorrectAnswers(questions));
        examRepository.save(exam);

        return examUtils.getNumberOfCorrectAnswers(questions);
    }
}
