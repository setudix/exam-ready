package com.du.yiit.examReady.question;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {

    List<Question> findByExamId(int examId);

    // Find a question by id
    //Question findById(int id);
}

