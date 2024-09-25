import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Button,
  Typography,
  Box,
  Paper,
  Snackbar,
  Alert,
  Container,
} from "@mui/material";
import ExamBar from "./ExamBar";
import ExamDataType from "./types/ExamDataType";
import axios from "axios";
import routes from "@/app/routes";
import { UseMCQDataStore } from "./mcqDataStore";
import { usePathname, useRouter } from "next/navigation";
import { UseExamStore } from "./examStateStore";
import examState from "./examState";

type prop = {
  // examData: ExamDataType;
  loading: boolean;
};
const MCQExam = ({ loading }: prop) => {
  const { control, handleSubmit, setValue, getValues, trigger } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const router = useRouter();
  const pathname = usePathname();
  var examData = UseMCQDataStore((s) => s.data);
  const xmState = UseExamStore((s) => s.state);
  const handleState = UseExamStore((s) => s.update);
  const handleMCQDataUpdate = UseMCQDataStore((s) => s.update);
  // useEffect(() => {
  //   examData = UseMCQDataStore(s => s.data);
  // }, [loading]);

  const getMCQOption = (question: any, selectedOption: string | null) => {
    if (selectedOption === null || selectedOption === undefined) {
      return null;
    }
    if (selectedOption === question.optionA) return "optionA";
    if (selectedOption === question.optionB) return "optionB";
    if (selectedOption === question.optionC) return "optionC";
    if (selectedOption === question.optionD) return "optionD";

    return null;
  };
  const onSubmit = async (data: any) => {
    const questions: any =
      examData?.questions &&
      examData?.questions.map((q, index) => ({
        questionId: q.id,
        selectedOption: getMCQOption(q, data[`question-${index}`]),
      }));

    const formattedData = {
      questions,
      examId: examData.exam?.id,
    };

    try {
      const response = await axios.post(routes.submitMCQExam, formattedData);

      setSubmittedData(formattedData);
      setOpenSnackbar(true);
      // handleState
      const url = routes.fe_getExamAnswerWithId + response.data.examId;
      router.replace(url);
      handleState(examState.EDITING);
      handleMCQDataUpdate(undefined);
    } catch (e) {
      router.replace(routes.home);
    }
  };

  useEffect(() => {
    if (xmState == examState.TIMEUP) {

      const handleAutoSubmit = async () => {
        await handleSubmit(onSubmit)();
      };

      handleAutoSubmit();
    }
  }, [xmState, handleSubmit, trigger]);
  const handleOptionClick = (questionIndex: any, optionValue: any) => {
    const currentValue = getValues(`question-${questionIndex}`);
    if (currentValue === optionValue) {
      setValue(`question-${questionIndex}`, "");
    } else {
      setValue(`question-${questionIndex}`, optionValue);
    }
  };

  const handleCloseSnackbar = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Container sx={{ height: "100%" }}>
        <ExamBar />
        <Box
          // className="max-w-2xl mx-auto mt-8 p-4"
          sx={{ flexGrow: 1, marginBottom: 4 }}
        >
          <Typography variant="h4" className="mb-4">
            MCQ Exam
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {examData?.questions != undefined &&
              examData.questions.map((q: any, index) => (
                <Paper key={index} sx={{ marginBottom: 4, padding: 4 }}>
                  <FormControl component="fieldset" className="w-full">
                    <FormLabel component="legend" className="mb-2">
                      {`${index + 1}. ${q.question}`}
                    </FormLabel>
                    <Controller
                      name={`question-${index}`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <RadioGroup {...field}>
                          {q.options.map(
                            (option: Array<string>, optionIndex: number) => (
                              <FormControlLabel
                                key={optionIndex}
                                value={option}
                                control={
                                  <Radio
                                    checked={field.value === option}
                                    onClick={() =>
                                      handleOptionClick(index, option)
                                    }
                                  />
                                }
                                label={option}
                              />
                            )
                          )}
                        </RadioGroup>
                      )}
                    />
                  </FormControl>
                </Paper>
              ))}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="mt-4"
            >
              Submit
            </Button>
          </form>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleCloseSnackbar}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Exam submitted successfully!
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </>
  );
};

export default MCQExam;
