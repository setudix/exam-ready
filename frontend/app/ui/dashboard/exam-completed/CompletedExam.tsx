import { Box, ListItem, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import CompletedExamQuestionType from "./types/CompletedExamQuestionType";
import RectangleIcon from '@mui/icons-material/Rectangle';
import CompletedExamType from "./types/CompletedExamType";
import MyItem from "./MyItem";
type prop = {
  info: CompletedExamType | undefined;
  ques: Array<CompletedExamQuestionType> | undefined;
};
const getBorderColor = (
  cur: string,
  selected: string | null,
  correct: string
) => {
  if (cur === selected) {
    if (selected === correct) {
      return "2pt green solid";
    }
    return "1.5pt red solid";
  }
  if (cur === correct) {
    return "2pt green solid";
  }
  return "0.5pt black solid";
};

const getBGColor = (
  cur: string,
  selected: string | null,
  correct: string
) => {
  if (cur === selected) {
    if (selected === correct) {
      return "darkseagreen";
    }
    return "tomato";
  }
  if (cur === correct) {
    return "lightsteelblue";
  }
  return "";
}
const CompletedExam = ({ info, ques }: prop) => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {
          info && 
          (
          <Paper sx={{marginY: 4, padding: 4}}>
            <MyItem left="Exam Name:" right={info.name} />
            <MyItem left="Score: " right={info.score} />
          </Paper> 
          )
        }
        <Paper sx={{ marginY: 4, padding: 4}}>
          <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
            <Stack  alignItems="center" spacing={2} justifyContent="space-evenly"> 
              <RectangleIcon fontSize="large" sx={{color: "darkseagreen"}}/>
              <RectangleIcon fontSize="large" sx={{color: "tomato"}}/>
              <RectangleIcon fontSize="large" sx={{color: "lightsteelblue"}}/>
            </Stack>
            <Stack alignItems="flex-start" spacing={3.5} justifyContent="space-evenly"> 
              <Typography variant="body1"> Correct Answer</Typography>
              <Typography variant="body1"> Incorrect Answer</Typography>
              <Typography variant="body1"> Correct Option </Typography>
            </Stack>
          </Stack>
        </Paper>
        {ques &&
          ques.map((q: CompletedExamQuestionType, index) => (
            <Box>
              <Paper key={index} sx={{ marginBottom: 4, padding: 4 }}>
                <Typography variant="body1">
                  {`${index + 1}. ${q.question}`}
                </Typography>

                {
                  <>
                    <ListItem
                      sx={{
                        margin: 0.5,
                        border: `${getBorderColor("optionA", q.selected, q.correctAnswer)}`,
                        borderRadius: 2,
                        backgroundColor: `${getBGColor("optionA", q.selected, q.correctAnswer)}`
                      }}
                    >
                      A. {q.optionA}
                    </ListItem>
                    <ListItem
                      sx={{
                        margin: 0.5,
                        border: `${getBorderColor("optionB", q.selected, q.correctAnswer)}`,
                        borderRadius: 2,
                        backgroundColor: `${getBGColor("optionB", q.selected, q.correctAnswer)}`
                      }}
                    >
                      B. {q.optionB}
                    </ListItem>
                    <ListItem
                      sx={{
                        margin: 0.5,
                        border: `${getBorderColor("optionC", q.selected, q.correctAnswer)}`,
                        borderRadius: 2,
                        
                        backgroundColor: `${getBGColor("optionC", q.selected, q.correctAnswer)}`
                      }}
                    >
                      C. {q.optionC}
                    </ListItem>
                    <ListItem
                      sx={{
                        margin: 0.5,
                        border: `${getBorderColor("optionD", q.selected, q.correctAnswer)}`,
                        borderRadius: 2,
                        backgroundColor: `${getBGColor("optionD", q.selected, q.correctAnswer)}`
                      }}
                    >
                      D. {q.optionD}
                    </ListItem>
                  </>
                }
              </Paper>
            </Box>

          ))}
      </Box>
    </>
  );
};

export default CompletedExam;
