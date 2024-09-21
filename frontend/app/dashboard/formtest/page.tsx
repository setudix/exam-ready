"use client";
import ExamForm from "@/app/ui/dashboard/examForm/ExamForm";
import MCQExam from "@/app/ui/dashboard/examForm/MCQExam";
import examState from "@/app/ui/dashboard/examForm/examState";
import { useMcqDataStore } from "@/app/ui/dashboard/examForm/mcqDataStore";
import { Container } from "@mui/material";
import React, { useState } from "react";

const page = () => {
  const [state, setState] = useState<examState>(examState.EDITING);
  const handleState = (val: examState) => {
    setState(() => val);
  };

  const mcqExamData = useMcqDataStore(state => state.data);
  return (
    <>
      <Container
      //  sx={{display: state === examState.EDITING ? "" :"none"}}
       >
        <ExamForm state={state} handleState={handleState} />
      </Container>

      <Container>
        <MCQExam questions={mcqExamData} />
      </Container>
    </>
  );
};

export default page;
