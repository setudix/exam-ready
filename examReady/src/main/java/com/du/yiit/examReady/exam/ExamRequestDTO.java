package com.du.yiit.examReady.exam;

public class ExamRequestDTO {
    private String examName;
    private boolean isExamDurationAuto;
    private int examDuration;
    private int questionSize;
    private String promptText;
    private String userId;
    private String examColor;

    public ExamRequestDTO()
    {

    }
    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public boolean getExamDurationAuto() {
        return isExamDurationAuto;
    }

    public void setExamDurationAuto(Boolean examDurationAuto) {
        isExamDurationAuto = examDurationAuto;
    }

    public int getExamDuration() {
        return examDuration;
    }

    public void setExamDuration(int examDuration) {
        this.examDuration = examDuration;
    }

    public int getQuestionSize() {
        return questionSize;
    }

    public void setQuestionSize(int questionSize) {
        this.questionSize = questionSize;
    }

    public String getPromptText() {
        return promptText;
    }

    public void setPromptText(String promptText) {
        this.promptText = promptText;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getExamColor() {
        return examColor;
    }

    public void setExamColor(String examColor) {
        this.examColor = examColor;
    }

    public ExamRequestDTO(String examName, Boolean isExamDurationAuto, int examDuration, int questionSize, String promptText, String userId, String examColor) {
        this.examName = examName;
        this.isExamDurationAuto = isExamDurationAuto;
        this.examDuration = examDuration;
        this.questionSize = questionSize;
        this.promptText = promptText;
        this.userId = userId;
        this.examColor = examColor;
    }

}
