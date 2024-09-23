package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.user.User;
import jakarta.persistence.*;

public class ExamWithoutUserDTO {
    private Integer id;
    private String name;
    private boolean isExamDurationAuto;
    private int duration;
    private int questionSize;
    private String prompt;
    private String color;
    private boolean taken;
    private boolean allowNegativeMarking;
    private boolean isExamDurationInfinite;
    private int numberOfAnswered;
    private double score;

    public ExamWithoutUserDTO(Exam exam) {
        this.id=exam.getId();
        this.color=exam.getColor();
        this.name=exam.getName();
        this.duration= exam.getDuration();
        this.numberOfAnswered=exam.getNumberOfAnswered();
        this.prompt=exam.getPrompt();
        this.questionSize=exam.getQuestionSize();
        this.score= exam.getScore();
        this.taken=exam.isTaken();
        this.isExamDurationAuto=exam.isExamDurationAuto();
        this.allowNegativeMarking=exam.isAllowNegativeMarking();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isExamDurationAuto() {
        return isExamDurationAuto;
    }

    public void setExamDurationAuto(boolean examDurationAuto) {
        isExamDurationAuto = examDurationAuto;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public int getQuestionSize() {
        return questionSize;
    }

    public void setQuestionSize(int questionSize) {
        this.questionSize = questionSize;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isTaken() {
        return taken;
    }

    public void setTaken(boolean taken) {
        this.taken = taken;
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

    public int getNumberOfAnswered() {
        return numberOfAnswered;
    }

    public void setNumberOfAnswered(int numberOfAnswered) {
        this.numberOfAnswered = numberOfAnswered;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }
}
