package com.du.yiit.examReady.exam;

import com.du.yiit.examReady.user.User;
import com.du.yiit.examReady.user.UserRepository;
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

    public int createExam(String name, boolean isExamDurationAuto, int duration, int questionSize, String prompt, String user_id, String color){
        Exam exam=new Exam();
        exam.setName(name);
        exam.setQuestionSize(questionSize);
        exam.setPrompt(prompt);
        exam.setUser(this.userRepository.getById(user_id));
        exam.setColor(color);
        exam.setTaken(false);
        if(isExamDurationAuto){
            exam.setDuration(questionSize);
        }
        else {
            exam.setDuration(duration);
        }
        Exam savedExam = examRepository.save(exam);
        return savedExam.getId();
    }

}
