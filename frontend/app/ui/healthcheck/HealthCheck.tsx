"use client";

import routes from "@/app/routes";
import { Alert, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

const HealthCheck = () => {
  const [apiStatus, setApiStatus] = useState(true);
  const [isSnackBarOpen, setIsSnakBarOpen] = useState(false);

  const checkStatus = async () => {
    try {
      // console.log("checking, snackbar : " + isSnackBarOpen);
      const response = await axios.get(routes.healthCheck);
      // console.log("status: ", response.status);
      if (response.status === 200) {
        setApiStatus(true);
        setIsSnakBarOpen(false);
      } else {
        setApiStatus(false);
        setIsSnakBarOpen(true);
      }
    } catch (error) {
      setApiStatus(false);
      setIsSnakBarOpen(true);
    }
  };

  useEffect(() => {
    checkStatus();

    const intervalId = setInterval(checkStatus, 15 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleCloseSnackbar = () => {
    setIsSnakBarOpen(false);
  };
  return (
    <>
      <Snackbar
        open={isSnackBarOpen}
        // autoHideDuration={2000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {"Back-end server is down :( You may notice unexpected behavior."}
        </Alert>
      </Snackbar>
    </>
  );
};

export default HealthCheck;
