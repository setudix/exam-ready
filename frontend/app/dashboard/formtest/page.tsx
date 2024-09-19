"use client";
import ExamForm from "@/app/ui/dashboard/examForm/ExamForm";
import examState from "@/app/ui/dashboard/examForm/examState";
import { Container } from "@mui/material";
import React, { useState } from "react";

const page = () => {
  const [state, setState] = useState<examState>(examState.EDITING);
  const handleState = (val: examState) => {
    setState(() => val);
  };
  return (
    <>
      <Container sx={{display: state === examState.EDITING ? "" :"none"}}>
        <ExamForm state={state} handleState={handleState} />
      </Container>
    </>
  );
};

export default page;
