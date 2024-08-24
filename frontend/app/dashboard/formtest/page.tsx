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
} from "@mui/material";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

import PublishIcon from "@mui/icons-material/Publish";

type FormValues = {
  examName: string;
  isExamDurationAuto: Boolean;
  examDuration: number;
  questionSize: number;
  promptText: string;
  userId: string;
};
const FormTest = () => {
  const examCreationForm = useForm<FormValues>();
  const { register, control, handleSubmit, setValue, getValues, watch } =
    examCreationForm;

  const [isExamDurationAuto, setIsExamDurationAuto] = useState<boolean>(true);
  const [examDuration, setExamDuration] = useState<number>(0);
  const [questionSize, setQuestionSize] = useState<number>(5);
  const [promptText, setPromptText] = useState<string>("");
  // useEffect(() => {
  //   // console.log(examDurationMode)
  // }, []);
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
      <Container className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={9}>
              <TextField
                helperText="Please enter the exam name"
                id="exam-name"
                label="Exam Name"
                fullWidth
                {...register("examName")}
              />
            </Grid>
            <Divider />
            <Grid item xs={9}>
              <Box display="flex" alignContent="center" flexDirection="row">
                <Typography>Exam Duration:</Typography>
                <FormControlLabel
                  // value="start"
                  control={
                    <Switch
                      defaultChecked
                      value={isExamDurationAuto}
                      // onChange={() =>
                      //   setIsExamDurationAuto(!isExamDurationAuto)
                      // }
                      color="primary"
                      {...register("isExamDurationAuto", {
                        onChange: (e) => {
                          setIsExamDurationAuto((pv) => !pv);
                          setValue("isExamDurationAuto", isExamDurationAuto);
                        },
                      })}
                    />
                  }
                  label="Automatic"
                  labelPlacement="start"
                  className="-my-2"
                />
                <Slider
                  value={examDuration}
                  onChange={handleDurationSliderChange}
                  min={1}
                  max={60}
                  aria-labelledby="exam-duration-slider"
                  valueLabelDisplay="auto"
                  disabled={getValues("isExamDurationAuto") as boolean}
                  // {...register("examDuration")}
                  className="p-4 my-2 ml-4 mr-8"
                />

                <Controller
                  name="examDuration"
                  control={control}
                  rules={{ min: 1, max: 60 }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      value={examDuration}
                      size="small"
                      onChange={(e) => {
                        field.onChange(e);
                        handleDurationInputChange(e);
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        handleExamDurationBlur();
                      }}
                      disabled={getValues("isExamDurationAuto") as boolean}
                      inputProps={{
                        step: 1,
                        min: 1,
                        max: 60,
                        type: "number",
                        "aria-labelledby": "exam-duration-slider",
                      }}
                    />
                  )}
                />
              </Box>
            </Grid>

            <Divider />
            <Grid item xs={9}>
              <Box display="flex" alignContent="center" flexDirection="row">
                <Typography>No. of Questions: </Typography>
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
            </Grid>

            <Grid item xs={9}>
              <TextField
                value={promptText}
                fullWidth
                multiline
                minRows={1}
                maxRows={7}
                placeholder="Enter the text prompt here"
                variant="outlined"
                {...register("promptText", {
                  onChange: (e) => setPromptText(e.target.value),
                })}
              />
              <Box display="flex" flexDirection="row-reverse">
                <Typography variant="caption" color="text.secondary">
                  {promptText.length}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={9}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<PublishIcon color="white" />}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        <DevTool control={control} />
      </Container>
    </>
  );
};

export default FormTest;
