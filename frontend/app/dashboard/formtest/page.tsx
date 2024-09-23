"use client";
import CompletedExam from "@/app/ui/dashboard/exam-completed/CompletedExam";
import ExamForm from "@/app/ui/dashboard/examForm/ExamForm";
import MCQExam from "@/app/ui/dashboard/examForm/MCQExam";
import PreExamWait from "@/app/ui/dashboard/examForm/PreExamWait";
import examState from "@/app/ui/dashboard/examForm/examState";
import { useExamStateStore } from "@/app/ui/dashboard/examForm/examStateStore";
import { useMcqDataStore } from "@/app/ui/dashboard/examForm/mcqDataStore";
import { Container } from "@mui/material";
import React, { useState } from "react";

const page = () => {
  // const [state, setState] = useState<examState>(examState.EDITING);
  // const handleState = (val: examState) => {
  //   setState(() => val);
  // };
  const state = useExamStateStore((state) => state.state);
  const [loading, setLoading] = useState<boolean>(false);
  const handleLoading = (val: boolean) => {
    setLoading(val);
  }
  const mcqExamData = useMcqDataStore((state) => state.data);
  return (
    <>
      <Container sx={{ height: "100%" }}>
        <Container
         sx={{display: state === examState.EDITING ? "" :"none"}}
        >
          <ExamForm handleLoading={handleLoading} />
        </Container>

        <Container 
          sx={{display: state === examState.WAITING || state === examState.WAITING_AND_DATAREADY? "" :"none"}}
        >
          <PreExamWait
            // state={state}
            // handleState={handleState}
            // examData={mcqExamData}
            loading={loading}
          />
        </Container>
        <Container
        sx={{display: state === examState.RUNNING ? "" :"none"}}
        >
          <MCQExam loading={loading}/>
        </Container>

        {/* <Container>
          <CompletedExam questions={mcqExamData} />
        </Container> */}
      </Container>
    </>
  );
};

export default page;
