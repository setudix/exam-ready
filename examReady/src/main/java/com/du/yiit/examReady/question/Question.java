package com.du.yiit.examReady.question;

import com.du.yiit.examReady.exam.Exam;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Table;

@Entity
@Table(name = "question")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private Exam exam;  // Foreign key reference to Exam entity

    @Column(name = "question", length = 200, nullable = false)
    private String question;

    @Column(name = "optionA", length = 50, nullable = false)
    private String optionA;

    @Column(name = "optionB", length = 50, nullable = false)
    private String optionB;

    @Column(name = "optionC", length = 50, nullable = false)
    private String optionC;

    @Column(name = "optionD", length = 50, nullable = false)
    private String optionD;

    @Column(name = "correctAnswer", length = 7, nullable = false)
    private String correctAnswer;

    @Column(name = "selected", length = 7, nullable= true)
    private String selected;

    public String getQuestion() {
        return question;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public String getSelected() {
        return selected;
    }

    public void setSelected(String selected) {
        this.selected = selected;
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
}
