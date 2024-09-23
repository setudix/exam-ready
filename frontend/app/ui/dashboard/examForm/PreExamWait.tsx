import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import examState from "./examState";
import ExamDataType from "./types/ExamDataType";
import CircleIcon from "@mui/icons-material/Circle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useExamStateStore } from "./examStateStore";
import { useMcqDataStore } from "./mcqDataStore";
type prop = {
  // examData: ExamDataType | undefined;
  // state: any;
  // handleState: (val: examState) => void;
  loading: boolean;
};

const PreExamWait = ({ loading }: prop) => {

  const handleState = useExamStateStore(s => s.update);
  const examData = useMcqDataStore(s => s.data);
  const handleOnclick = (e: any) => {
    alert("You can only take this exam once!");

    handleState(examState.RUNNING);
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          padding: 4,
          margin: 4,
        }}
      >
        <Paper elevation={3} sx={{ borderRadius: 2, padding: 4 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Stack spacing={3}>
              <Box sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                  spacing={3}
                >
                  <Typography variant="h4">
                    <CircleIcon
                      sx={{ color: examData && examData.exam?.color }}
                    ></CircleIcon>
                    {examData && examData.exam?.name}
                  </Typography>
                </Stack>
              </Box>

              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  onClick={handleOnclick}
                >
                  <Typography> Start Exam</Typography>
                </Button>
              </Stack>
            </Stack>
          )}
        </Paper>
      </Box>
    </>
  );
};

export default PreExamWait;
