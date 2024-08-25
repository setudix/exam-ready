package com.du.yiit.examReady.test;


public class FormValues {
    private String examName;
    private Boolean isExamDurationAuto;
    private Integer examDuration;
    private Integer questionSize;
    private String promptText;
    private String userId;

    // Default constructor
    public FormValues() {}

    // Getters and setters
    public String getExamName() {
        return examName;
    }

    public void setExamName(String examName) {
        this.examName = examName;
    }

    public Boolean getIsExamDurationAuto() {
        return isExamDurationAuto;
    }

    public void setIsExamDurationAuto(Boolean isExamDurationAuto) {
        this.isExamDurationAuto = isExamDurationAuto;
    }

    public Integer getExamDuration() {
        return examDuration;
    }

    public void setExamDuration(Integer examDuration) {
        this.examDuration = examDuration;
    }

    public Integer getQuestionSize() {
        return questionSize;
    }

    public void setQuestionSize(Integer questionSize) {
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

    // ToString method for debugging
    @Override
    public String toString() {
        return "FormValues{" +
                "examName='" + examName + '\'' +
                ", isExamDurationAuto=" + isExamDurationAuto +
                ", examDuration=" + examDuration +
                ", questionSize=" + questionSize +
                ", promptText='" + promptText + '\'' +
                ", userId='" + userId + '\'' +
                '}';
    }
}