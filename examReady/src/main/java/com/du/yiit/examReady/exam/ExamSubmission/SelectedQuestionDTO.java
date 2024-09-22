package com.du.yiit.examReady.exam.ExamSubmission;

public class SelectedQuestionDTO {
    private int questionId;
    private String selectedOption;

    public SelectedQuestionDTO(){

    }
    public SelectedQuestionDTO(int questionId, String selectedOption) {
        this.questionId = questionId;
        this.selectedOption = selectedOption;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getSelectedOption() {
        return selectedOption;
    }

    public void setSelectedOption(String selectedOption) {
        this.selectedOption = selectedOption;
    }

    @Override
    public String toString() {
        return "SelectedQuestionDTO{" +
                "questionId=" + questionId +
                ", selectedOption='" + selectedOption + '\'' +
                '}';
    }
}
