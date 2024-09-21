"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";

interface TimerProps {
  initialTime: number;
}

const Timer = ({ initialTime = 0 }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [timeLeft]);

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
        <Box
          // sx={{
          //   position: "fixed",
          //   top: { xs: 16, sm: 24, md: 32 },
          //   right: { xs: 16, sm: 24, md: 32 },
          //   padding: { xs: 2, sm: 3, md: 4 },
          //   borderRadius: 2,
          //   backgroundColor: "rgba(255, 255, 255, 0.1)",
          //   backdropFilter: "blur(5px)",
          //   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          //   zIndex: "tooltip",
          // }}
        >
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
