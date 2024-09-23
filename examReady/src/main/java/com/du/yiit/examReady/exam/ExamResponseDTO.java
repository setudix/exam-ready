package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.question.Question;
import com.du.yiit.examReady.question.QuestionWithoutExam;

import java.util.ArrayList;
import java.util.List;

public class ExamResponseDTO {
    private ExamWithoutUserDTO examWithoutUserDTO;
    private List<QuestionWithoutExam> questionWithoutExams;

    public ExamResponseDTO(ExamWithoutUserDTO examWithoutUserDTO, List<QuestionWithoutExam> questionWithoutExams) {
        this.examWithoutUserDTO = examWithoutUserDTO;
        this.questionWithoutExams = questionWithoutExams;
    }

    public ExamWithoutUserDTO getExamWithoutUserDTO() {
        return examWithoutUserDTO;
    }

    public void setExamWithoutUserDTO(ExamWithoutUserDTO examWithoutUserDTO) {
        this.examWithoutUserDTO = examWithoutUserDTO;
    }

    public List<QuestionWithoutExam> getQuestionWithoutExams() {
        return questionWithoutExams;
    }

    public void setQuestionWithoutExams(List<QuestionWithoutExam> questionWithoutExams) {
        this.questionWithoutExams = questionWithoutExams;
    }
}
