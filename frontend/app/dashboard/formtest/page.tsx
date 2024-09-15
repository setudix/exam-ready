"use client";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Slider,
  Stack,
  TextField,
  Typography,
  Input,
  Container,
  Switch,
  FormControlLabel,
  Divider,
  Button,
  IconButton,
  Tooltip,
  Grow,
  Fade,
  Collapse,
} from "@mui/material";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import PublishIcon from "@mui/icons-material/Publish";
import ArticleIcon from "@mui/icons-material/Article";
import TimerIcon from "@mui/icons-material/Timer";
import AlarmOnIcon from "@mui/icons-material/AlarmOn";
import AlarmOffIcon from "@mui/icons-material/AlarmOff";
import NumbersIcon from "@mui/icons-material/Numbers";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";

type FormValues = {
  examName: string;
  isExamDurationAuto: Boolean;
  examDuration: number;
  questionSize: number;
  promptText: string;
  userId: string;
};
const FormTest = () => {
  const examCreationForm = useForm<FormValues>({
    defaultValues: {
      examName: "",
      isExamDurationAuto: true,
      examDuration: 0,
      questionSize: 15,
      promptText: "",
    },
  });
  const { register, control, handleSubmit, setValue, getValues, watch } =
    examCreationForm;

  const [isExamDurationAuto, setIsExamDurationAuto] = useState<boolean>(true);
  const [examDuration, setExamDuration] = useState<number>(0);
  const [questionSize, setQuestionSize] = useState<number>(15);
  const [promptText, setPromptText] = useState<string>("");

  useEffect(() => {
    // console.log("state : " + isExamDurationAuto);
    // console.log("form : " + getValues("isExamDurationAuto"));
    setValue("isExamDurationAuto", isExamDurationAuto);
  }, [isExamDurationAuto]);

  const onSubmit = async (data: FormValues) => {
    console.log("before ", data);

    try {
      const response = await fetch("http://localhost:8080/api/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Form submitted successfully:", result);
      // Handle success (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleDurationSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    setExamDuration(newValue);
    setValue("examDuration", newValue);
  };

  const handleDurationInputChange = (event: any) => {
    setExamDuration(Number(event.target.value));
  };

  const handleExamDurationBlur = () => {
    if (Number(examDuration) < 0) {
      setExamDuration(0);
    } else if (Number(examDuration) > 60) {
      setExamDuration(60);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setQuestionSize(newValue as number);
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue =
      event.target.value === "" ? "" : Number(event.target.value);

    setQuestionSize(inputValue as number);
  };

  const handleBlur = () => {
    if (questionSize < 5) {
      setQuestionSize(5);
    } else if (questionSize > 50) {
      setQuestionSize(50);
    }
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: 360, md: 400, lg: 440 },
          margin: "auto",
          marginTop: "2rem",
        }}
      >
        <Stack direction="column" spacing={3}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <ArticleIcon color="action" />
            <Box sx={{ flexGrow: 1 }}>
              {/* <Typography variant="caption">Exam Name:</Typography> */}
              <TextField
                fullWidth
                placeholder="Enter the name of the exam"
                variant="outlined"
                label="Exam Name"
                {...register("examName")}
              />
            </Box>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={2}>
            {isExamDurationAuto ? (
              <AlarmOffIcon color="action" />
            ) : (
              <AlarmOnIcon color="action" />
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Tooltip title="Automatic duration means each question will have 1 minute">
                  <Typography variant="subtitle1">
                    Automatic Exam Duration:
                  </Typography>
                </Tooltip>
                <Switch
                  defaultChecked
                  value={isExamDurationAuto}
                  {...register("isExamDurationAuto", {
                    onChange: (e) => {
                      setIsExamDurationAuto((pv) => !pv);
                      // console.log("from onchange: " + isExamDurationAuto);
                    },
                  })}
                />
              </Stack>
            </Box>
          </Stack>
          <Fade
            in={!isExamDurationAuto}
            // timeout={isExamDurationAuto? 1000: 0}
            // timeout={1000}
            timeout={{ appear: 0, enter: 700, exit: 200 }}
            unmountOnExit
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              // display={!isExamDurationAuto ? "none" : ""}
            >
              <TimerIcon color="action" />
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="caption">
                  {"Exam Duration (Minutes)"}
                </Typography>
                <Slider
                  value={examDuration}
                  onChange={handleDurationSliderChange}
                  min={1}
                  max={60}
                  aria-labelledby="exam-duration-slider"
                  valueLabelDisplay="auto"
                  // disabled={getValues("isExamDurationAuto") as boolean}
                  // {...register("examDuration")}
                />
              </Box>
            </Stack>
          </Fade>

          <Stack direction="row" alignItems="center" spacing={2}>
            <NumbersIcon color="action" />
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="caption">Number of Questions:</Typography>
              <Slider
                value={questionSize}
                // onChange={handleSliderChange}
                min={5}
                max={50}
                step={5}
                marks
                valueLabelDisplay="auto"
                {...register("questionSize", {
                  onChange: (e) => {
                    const newValue: number = Number(e?.target.value);
                    handleSliderChange(e, newValue);
                  },
                })}
              />
            </Box>
          </Stack>
          <Stack spacing={0}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <LibraryBooksIcon color="action" />
              <Box sx={{ flexGrow: 1 }}>
                <Stack>
                  <TextField
                    value={promptText}
                    fullWidth
                    multiline
                    minRows={1}
                    maxRows={7}
                    label="Enter the text prompt"
                    placeholder="Enter the text prompt here"
                    variant="outlined"
                    {...register("promptText", {
                      onChange: (e) => setPromptText(e.target.value),
                    })}
                  />
                </Stack>
              </Box>
            </Stack>
            <Box display="flex" flexDirection="row-reverse">
              <Typography variant="caption" color="text.secondary">
                {promptText.length +
                  (promptText.length < 2 ? " character" : " characters")}
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<PublishIcon />}
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default FormTest;
