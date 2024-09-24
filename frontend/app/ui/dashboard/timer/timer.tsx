"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { UseExamStore } from "../examForm/examStateStore";
import examState from "../examForm/examState";
import { UseMCQDataStore } from "../examForm/mcqDataStore";

interface TimerProps {
  getTime: () => number;
  isExamUntimed: () => boolean;
}

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  // const examUntimed = isExamUntimed();
  const state = UseExamStore((s) => s.state);
  const handleState = UseExamStore((s) => s.update);
  const examData = UseMCQDataStore((s) => s.data);

  const getExamTime = () => {
    console.log("examData: ", examData);
    if (examData){
      if (examData.exam?.isExamDurationInfinite) {
        return -1;
      }
      if (examData.exam?.examDurationAuto) {
        return examData.exam.questionSize * 60;
      }
      if (examData.exam?.duration) {
        return examData.exam.duration * 60;
      }
      return 5;
    }
    return 0;
  };

  const initialTime = useMemo(() => {
    if (state === examState.WAITING_AND_DATAREADY) {
      console.log(state);
      const time = getExamTime();
      setTimeLeft(time);
      return time;
    }
    return 0;
  }, [state]);
  const getExamUntimed = () => {
    if (examData && examData.exam?.isExamDurationInfinite) {
      return examData.exam.isExamDurationInfinite;
    }
    return false;
  };
  // console.log("time limit: ", initialTime);
  useEffect(() => {
    if (state === examState.RUNNING && getExamUntimed() == false) {
      if (timeLeft > 0) {
        const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
        return () => clearTimeout(timerId);
      }

      if (timeLeft <= 0 && state === examState.RUNNING) {
        handleState(examState.TIMEUP);
      }
    }
  }, [timeLeft, state]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const isLessThanMinute = timeLeft < 60 && timeLeft >= 0;
  const isTimeNegative = timeLeft < 0;

  return (
    <>
      {isTimeNegative ? (
        ""
      ) : (
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bold",
              color: isLessThanMinute ? "error.main" : "success.main",
            }}
          >
            {"Time Remanining: " + formatTime(timeLeft)}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default Timer;
