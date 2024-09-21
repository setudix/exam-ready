package com.du.yiit.examReady.exam;


public class ExamWithoutPromptDTO {
    private int id;
    private String name;
    private boolean isExamDurationAuto;
    private int duration;
    private int questionSize;
    private String color;
    private boolean taken;
    private Integer score;

    public ExamWithoutPromptDTO(Exam exam){
        this.id=exam.getId();
        this.name=exam.getName();
        this.isExamDurationAuto=exam.isExamDurationAuto();
        this.duration=exam.getDuration();
        this.questionSize= exam.getQuestionSize();
        this.color=exam.getColor();
        this.taken=exam.isTaken();
        this.score=exam.getScore();

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

    public Integer getScore() {
        return score;
    }


}

