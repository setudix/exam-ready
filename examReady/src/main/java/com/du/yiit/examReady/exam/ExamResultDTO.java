package com.du.yiit.examReady.exam;

public class ExamResultDTO {
    private int examId;
    public ExamResultDTO(int examId) {
        this.examId=examId;
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }
}
