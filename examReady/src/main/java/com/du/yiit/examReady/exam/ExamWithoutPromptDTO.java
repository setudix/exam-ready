package com.du.yiit.examReady.exam;


public class ExamWithoutPromptDTO {
    private int id;
    private String name;
    private boolean isExamDurationAuto;
    private int duration;
    private int questionSize;
    private String color;
    private boolean taken;
    private double score;

    private boolean allowNegativeMarking;
    private boolean isExamDurationInfinite;
    public ExamWithoutPromptDTO(Exam exam){
        this.id=exam.getId();
        this.name=exam.getName();
        this.isExamDurationAuto=exam.isExamDurationAuto();
        this.duration=exam.getDuration();
        this.questionSize= exam.getQuestionSize();
        this.color=exam.getColor();
        this.taken=exam.isTaken();
        this.score=exam.getScore();
        this.allowNegativeMarking=exam.isAllowNegativeMarking();
        this.isExamDurationInfinite=exam.isExamDurationInfinite();

    }

    public String getName() {
        return name;
    }

    public int getId() {
        return id;
    }

    public boolean isExamDurationAuto() {
        return isExamDurationAuto;
    }

    public int getDuration() {
        return duration;
    }

    public int getQuestionSize() {
        return questionSize;
    }

    public String getColor() {
        return color;
    }

    public boolean isTaken() {
        return taken;
    }

    public double getScore() {
        return score;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExamDurationAuto(boolean examDurationAuto) {
        isExamDurationAuto = examDurationAuto;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public void setQuestionSize(int questionSize) {
        this.questionSize = questionSize;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public void setTaken(boolean taken) {
        this.taken = taken;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public boolean isAllowNegativeMarking() {
        return allowNegativeMarking;
    }

    public void setAllowNegativeMarking(boolean allowNegativeMarking) {
        this.allowNegativeMarking = allowNegativeMarking;
    }

    public boolean isExamDurationInfinite() {
        return isExamDurationInfinite;
    }

    public void setExamDurationInfinite(boolean examDurationInfinite) {
        isExamDurationInfinite = examDurationInfinite;
    }
}

