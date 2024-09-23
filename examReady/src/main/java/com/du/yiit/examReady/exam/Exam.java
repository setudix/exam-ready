package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.user.User;
import jakarta.persistence.*;

@Entity
    @Table(name = "exam")
    public class Exam {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Integer id;

        @Column(name = "name", length = 50, nullable = false)
        private String name;

        @Column(name = "is_exam_duration_auto", nullable = false)
        private boolean isExamDurationAuto;

        @Column(name = "duration", nullable = false)
        private int duration;

        @Column(name = "question_size", nullable = false)
        private int questionSize;

        @Column(name = "prompt", length = 30000)
        private String prompt;

        @ManyToOne
        @JoinColumn(name = "user_id", nullable = true) // Nullable foreign key
        private User user;

        @Column(name = "color", length = 20)
        private String color;

        @Column(name = "taken", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
        private boolean taken;

        @Column (name = "allowNegativeMarking", nullable=false, columnDefinition = "BOOLEAN DEFAULT FALSE")
        private boolean allowNegativeMarking;

        @Column (name = "isExamDurationInfinite", nullable=false, columnDefinition = "BOOLEAN DEFAULT FALSE")
        private boolean isExamDurationInfinite;

        @Column(name = "numberOfAnswered", nullable = false, columnDefinition = "int DEFAULT 0")
        private int numberOfAnswered;

        @Column(name = "score", nullable = true)
        private double score;

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

    public int getNumberOfAnswered() {
        return numberOfAnswered;
    }

    public void setNumberOfAnswered(int numberOfAnswered) {
        this.numberOfAnswered = numberOfAnswered;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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

    public double getScore() {
        return score;
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
