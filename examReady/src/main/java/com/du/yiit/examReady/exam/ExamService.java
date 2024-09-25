package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.user.User;
import com.du.yiit.examReady.user.UserRepository;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExamService {
    @Autowired
    ExamRepository examRepository;
    @Autowired
    UserRepository userRepository;

    public ExamService(ExamRepository examRepository,UserRepository userRepository ){
        this.examRepository=examRepository;
        this.userRepository=userRepository;
    }


    public int createExam(ExamRequestDTO examRequestDTO){
        Exam exam=new Exam();
        if(examRequestDTO.getUserId().equals(" ") || examRequestDTO.getUserId() == null){
            examRequestDTO.setUserId("Unauthorized");
        }
        exam.setName(examRequestDTO.getExamName());
        exam.setQuestionSize(examRequestDTO.getQuestionSize());
        exam.setPrompt(examRequestDTO.getPromptText());
        exam.setUser(this.userRepository.getById(examRequestDTO.getUserId()));
        exam.setColor(examRequestDTO.getExamColor());
        exam.setTaken(false);
        exam.setExamDurationInfinite(examRequestDTO.isExamDurationInfinite());
        exam.setAllowNegativeMarking(examRequestDTO.isAllowNegativeMarking());
        exam.setNumberOfAnswered(0);
        exam.setNumberOfCorrect(0);
        Instant now = Instant.now();
        exam.setCreationDate(now.getEpochSecond());
        if(examRequestDTO.getExamDurationAuto()){
            exam.setDuration(examRequestDTO.getQuestionSize());
        }
        else {
            exam.setDuration(examRequestDTO.getExamDuration());
        }
        Exam savedExam = examRepository.save(exam);
        return savedExam.getId();
    }
}
