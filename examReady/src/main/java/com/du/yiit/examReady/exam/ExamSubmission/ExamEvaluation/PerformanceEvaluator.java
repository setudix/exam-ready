package com.du.yiit.examReady.exam.ExamSubmission.ExamEvaluation;

public class PerformanceEvaluator {
    EvaluationStrategy evaluationStrategy;

    public PerformanceEvaluator(){}

    public void setEvaluationStrategy(EvaluationStrategy evaluationStrategy) {
        this.evaluationStrategy = evaluationStrategy;
    }

    public double getEvaluation(int examId){
        return this.evaluationStrategy.evaluate(examId);
    }
}
