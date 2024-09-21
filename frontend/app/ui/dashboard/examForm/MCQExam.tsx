import React, { useState } from "react";
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


type prop = {
  examData: ExamDataType;
};
const MCQExam = ({ examData }: prop) => {
  const { control, handleSubmit, setValue, getValues } = useForm();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data: any) => {
    const formattedData = examData?.questions && examData?.questions.map((q, index) => ({
      questionId: q.id,
      selectedOption: data[`question-${index}`] || null,
      // options: q.options,
    }));

    console.log(JSON.stringify(formattedData, null, 2));
    setSubmittedData(formattedData);
    setOpenSnackbar(true);
  };

  const handleOptionClick = (questionIndex, optionValue) => {
    const currentValue = getValues(`question-${questionIndex}`);
    if (currentValue === optionValue) {
      setValue(`question-${questionIndex}`, "");
    } else {
      setValue(`question-${questionIndex}`, optionValue);
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <>
      <Container sx={{height:"100%"}}>
        <ExamBar />
        <Box 
        // className="max-w-2xl mx-auto mt-8 p-4"
        sx={{flexGrow:1, marginBottom:4}}
        >
          <Typography variant="h4" className="mb-4">
            MCQ Exam
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            { examData?.questions != undefined && examData.questions.map((q:any, index) => (
              <Paper
                key={index}
                sx={{marginBottom:4, padding:4}}
                
              >
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
                        {q.options.map((option: Array<string>, optionIndex: number) => (
                          <FormControlLabel
                            key={optionIndex}
                            value={option}
                            control={
                              <Radio
                                checked={field.value === option}
                                onClick={() => handleOptionClick(index, option)}
                              />
                            }
                            label={option}
                          />
                        ))}

                        {/* <FormControlLabel 
                          key="optionA"
                          value="optionA"
                          control={
                            <Radio 
                            checked={field.value === "optionA"}
                            onClick={() => handleOptionClick()}
                          }
                        /> */}
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
