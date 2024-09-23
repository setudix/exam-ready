package com.du.yiit.examReady.exam;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ExamRepository extends JpaRepository<Exam, Integer> {

    // Find an Exam by id
    //Exam findById(int id);

    // Find all Exams by userId
    List<Exam> findByUserId(String userId);
}

