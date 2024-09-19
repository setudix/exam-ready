import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  Radio, 
  RadioGroup, 
  FormControlLabel, 
  FormControl, 
  FormLabel, 
  Button, 
  Typography, 
  Box, 
  Paper 
} from '@mui/material';

type prop = {
  questions: Array<any>;
}

const MCQExam = ({ questions } : prop) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you can handle the submission, e.g., sending data to a server
  };

  return (
    <Box className="max-w-2xl mx-auto mt-8 p-4">
      <Typography variant="h4" className="mb-4">MCQ Exam</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        {questions.map((q, index) => (
          <Paper key={index} className="mb-4 p-4">
            <FormControl component="fieldset" className="w-full">
              <FormLabel component="legend" className="mb-2">
                {`${index + 1}. ${q.question}`}
              </FormLabel>
              <Controller
                name={`question-${index}`}
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {q.options.map((option, optionIndex) => (
                      <FormControlLabel
                        key={optionIndex}
                        value={option}
                        control={<Radio />}
                        label={option}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
            </FormControl>
          </Paper>
        ))}
        <Button type="submit" variant="contained" color="primary" className="mt-4">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default MCQExam;