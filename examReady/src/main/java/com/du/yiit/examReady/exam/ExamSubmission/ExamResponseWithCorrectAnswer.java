package com.du.yiit.examReady.exam.ExamSubmission;

import com.du.yiit.examReady.exam.Exam;
import com.du.yiit.examReady.question.QuestionWithCorrectDTO;
import com.du.yiit.examReady.question.QuestionWithoutCorrectDTO;

import java.util.ArrayList;

public class ExamResponseWithCorrectAnswer {
    private Exam exam;
    private ArrayList<QuestionWithCorrectDTO> questions;

    public ExamResponseWithCorrectAnswer(Exam exam, ArrayList<QuestionWithCorrectDTO> questions) {
        this.exam = exam;
        this.questions = questions;
    }

    public Exam getExam() {
        return exam;
    }

    public void setExam(Exam exam) {
        this.exam = exam;
    }

    public ArrayList<QuestionWithCorrectDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(ArrayList<QuestionWithCorrectDTO> questions) {
        this.questions = questions;
    }
}
