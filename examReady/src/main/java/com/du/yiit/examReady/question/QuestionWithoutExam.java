package com.du.yiit.examReady.question;

import com.du.yiit.examReady.exam.Exam;
import jakarta.persistence.*;

public class QuestionWithoutExam {
    private Integer id;
    private String question;
    private String optionA;
    private String optionB;
    private String optionC;
    private String optionD;
    private String correctAnswer;
    private String selected;

    public QuestionWithoutExam(Question question){
        this.id = question.getId();
        this.question = question.getQuestion();
        this.optionA=question.getOptionA();
        this.optionB=question.getOptionB();
        this.optionC=question.getOptionC();
        this.optionD=question.getOptionD();
        this.correctAnswer=question.getCorrectAnswer();
        this.selected=question.getSelected();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getOptionA() {
        return optionA;
    }

    public void setOptionA(String optionA) {
        this.optionA = optionA;
    }

    public String getOptionB() {
        return optionB;
    }

    public void setOptionB(String optionB) {
        this.optionB = optionB;
    }

    public String getOptionC() {
        return optionC;
    }

    public void setOptionC(String optionC) {
        this.optionC = optionC;
    }

    public String getOptionD() {
        return optionD;
    }

    public void setOptionD(String optionD) {
        this.optionD = optionD;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public String getSelected() {
        return selected;
    }

    public void setSelected(String selected) {
        this.selected = selected;
    }
}
