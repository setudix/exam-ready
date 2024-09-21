package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.question.QuestionWithoutCorrectDTO;

import java.util.List;

public class CreateExamResponse {
    public ExamWithoutPromptDTO getExam() {
        return exam;
    }

    public List<QuestionWithoutCorrectDTO> getQuestions() {
        return questions;
    }

    private ExamWithoutPromptDTO exam;
    private List<QuestionWithoutCorrectDTO> questions;

    public CreateExamResponse(ExamWithoutPromptDTO exam, List<QuestionWithoutCorrectDTO> questions) {
        this.exam = exam;
        this.questions = questions;
    }

}
