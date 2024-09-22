"use client";
import {
  Box,
  Slider,
  Stack,
  TextField,
  Typography,
  Switch,
  Button,
  Tooltip,
  Fade,
  Card,
  Container,
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
import PaletteIcon from "@mui/icons-material/Palette";
import { useSession } from "next-auth/react";
import SelectColors from "./SelectColors";
import examState from "./examState";
import { useMcqDataStore } from "./mcqDataStore";
import routes from "@/app/routes";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import ReportIcon from "@mui/icons-material/Report";
import ReportOffIcon from "@mui/icons-material/ReportOff";


import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type props = {
  state: any;
  handleState: (val: examState) => void;
};


type FormValues = {
  examName: string;
  isExamDurationAuto: boolean;
  examDuration: number;
  questionSize: number;
  promptText: string;
  userId: string;
  examColor: string;
  allowNegativeMarking: boolean;
  isExamDurationInfinite: boolean;
};
const schema = yup.object({
  allowNegativeMarking: yup.boolean(),
  isExamDurationInfinite: yup.boolean(),
  isExamDurationAuto: yup.boolean(),
})
const ExamForm = ({ state, handleState }: props) => {
  //////// EXAM FORM CREATION
  const examCreationForm = useForm<FormValues>({
    defaultValues: {
      examName: "",
      isExamDurationAuto: true,
      examDuration: 0,
      questionSize: 15,
      promptText: "",
      examColor: "#a3a3a3",
      allowNegativeMarking: false,
      isExamDurationInfinite: false,
    },
    resolver: yupResolver(schema),
  });
  const { register, control, handleSubmit, setValue, getValues, watch } =
    examCreationForm;

  const [isExamDurationAuto, setIsExamDurationAuto] = useState<boolean>(true);
  const [examDuration, setExamDuration] = useState<number>(0);
  const [questionSize, setQuestionSize] = useState<number>(15);
  const [promptText, setPromptText] = useState<string>("");
  const [examColor, setExamColor] = useState<string>("#a3a3a3");
  const [isExamDurationInfinite, setExamDurationInfinite] =
    useState<boolean>(false);
  const [allowNegativeMarking, setAllowNegativeMarking] =
    useState(false);

  const { data: session } = useSession();

  useEffect(() => {
    setValue("isExamDurationAuto", isExamDurationAuto as boolean);
  }, [isExamDurationAuto]);

  useEffect(() => {
    setValue("examColor", examColor);
  }, [examColor]);

  // useEffect(() => {
  //   setValue("allowNegativeMarking", allowNegativeMarking as boolean);
  // }, [allowNegativeMarking])

  // useEffect(() => {
  //   setValue("isExamDurationInfinite", isExamDurationInfinite);
  //   console.log("--- : ", isExamDurationInfinite);
  // },[isExamDurationInfinite])
  ////////// ZUSTAND STUFF
  const updateMCQData = useMcqDataStore((state) => state.update);

  ////////// ON SUBMIT

  const onSubmit = async (data: FormValues) => {
    const userId = session?.user.id;
    console.log("userid: ", userId);
    if (userId) {
      setValue("userId", userId);
      data.userId = userId;
      // console.log("userid: ", data);
    }

    console.log("before ", data);
    console.log("type: ", typeof(data.allowNegativeMarking));
    console.log("get: ", getValues("allowNegativeMarking"))
    console.log("state", allowNegativeMarking);
    try {
      const response = await fetch(routes.createDummyExam, {
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

      updateMCQData(result);
      handleState(examState.RUNNING);
    } catch (error) {
      console.error("Error submitting form:", error);
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

  const handleBlur = () => {
    if (questionSize < 5) {
      setQuestionSize(5);
    } else if (questionSize > 50) {
      setQuestionSize(50);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: 360, md: 440, lg: 740 },
            margin: "auto",
            marginTop: "2rem",
          }}
        >
          {/* <Card sx={{margin:4, padding:4}}> */}
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
                    checked={isExamDurationAuto}
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
              timeout={{ appear: 0, enter: 700, exit: 200 }}
              unmountOnExit
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                {isExamDurationInfinite ? (
                  <HourglassEmptyIcon color="action" />
                ) : (
                  <HourglassDisabledIcon color="action" />
                )}
                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1">Untimed Exam:</Typography>
                    <Switch
                      value={isExamDurationInfinite}
                      {...register("isExamDurationInfinite", {
                        onChange: (e) => {
                          setExamDurationInfinite((pv) => !pv);
                        },
                      })}
                    />
                  </Stack>
                </Box>
              </Stack>
            </Fade>
            <Fade
              in={!isExamDurationAuto}
              timeout={{ appear: 0, enter: 700, exit: 200 }}
              unmountOnExit
            >
              <Stack direction="row" alignItems="center" spacing={2}>
                <TimerIcon color="action" />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography variant="caption">
                      {"Exam Duration (Minutes)"}
                    </Typography>
                    <Typography variant="caption">{examDuration}</Typography>
                  </Stack>
                  <Slider
                    value={examDuration}
                    onChange={handleDurationSliderChange}
                    min={1}
                    max={60}
                    aria-labelledby="exam-duration-slider"
                    valueLabelDisplay="auto"
                    disabled={isExamDurationInfinite}
                  />
                </Box>
              </Stack>
            </Fade>

            <Stack direction="row" alignItems="center" spacing={2}>
              <NumbersIcon color="action" />
              <Box sx={{ flexGrow: 1 }}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption">
                    Number of Questions:
                  </Typography>
                  <Typography variant="caption">{questionSize}</Typography>
                </Stack>
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

            {session && (
              <Stack direction="row" alignItems="center" spacing={2}>
                <PaletteIcon color="action" />
                <Box sx={{ flexGrow: 1 }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Tooltip title="Colors help you organize your exams">
                      <Typography variant="subtitle1">
                        Select A Color
                      </Typography>
                    </Tooltip>
                    <SelectColors value={examColor} setValue={setExamColor} />
                  </Stack>
                </Box>
              </Stack>
            )}

            <Stack direction="row" alignItems="center" spacing={2}>
              {allowNegativeMarking ? (
                <ReportIcon color="action" />
              ) : (
                <ReportOffIcon color="action" />
              )}
              <Box sx={{ flexGrow: 1 }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="subtitle1">Allow Negative Marking:</Typography>
                  <Switch
                    value={allowNegativeMarking}
                    {...register("allowNegativeMarking", {
                      onChange: (e) => {

                        setAllowNegativeMarking(allowNegativeMarking ? false : true);
                      },
                      setValueAs: v => {return allowNegativeMarking ? true : false}
                    })}
                  />
                </Stack>
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
          {/* </Card> */}
        </Box>
      </form>
    </>
  );
};

export default ExamForm;
