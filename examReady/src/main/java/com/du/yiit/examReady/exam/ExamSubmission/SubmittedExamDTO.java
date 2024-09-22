package com.du.yiit.examReady.exam.ExamSubmission;

import com.nimbusds.oauth2.sdk.AccessTokenResponse;

import java.util.ArrayList;

public class SubmittedExamDTO {
    private int examId;
    private ArrayList<SelectedQuestionDTO> questions;

    public SubmittedExamDTO(int examId, ArrayList<SelectedQuestionDTO> questions) {
        this.examId = examId;
        this.questions = questions;
    }

    public SubmittedExamDTO() {
    }

    public int getExamId() {
        return examId;
    }

    public void setExamId(int examId) {
        this.examId = examId;
    }

    public ArrayList<SelectedQuestionDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<SelectedQuestionDTO> questions) {
        this.questions = questions;
    }

    @Override
    public String toString() {
        return "SubmittedExamDTO{" +
                "examId=" + examId +
                ", questions=" + questions +
                '}';
    }
}
