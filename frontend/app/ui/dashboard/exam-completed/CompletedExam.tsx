import { Box, Button, ListItem, Paper, Stack, Typography } from "@mui/material";
import React, { useRef } from "react";
import CompletedExamQuestionType from "./types/CompletedExamQuestionType";
import RectangleIcon from "@mui/icons-material/Rectangle";
import CompletedExamType from "./types/CompletedExamType";
import MyItem from "./MyItem";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import html2canvas from "html2canvas";
import jspdf from "jspdf";
import { usePDF } from "react-to-pdf";

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

const getBGColor = (cur: string, selected: string | null, correct: string) => {
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
};
const CompletedExam = ({ info, ques }: prop) => {
  const pdfRef = useRef(null);
  const { toPDF, targetRef } = usePDF({
    filename:`examReady-${info?.name}.pdf`,
    page: {
      margin: 10,
    },
  });
  
  
  return (
    <>
      {info && (
        <Box
          sx={{
            paddingTop: 4,
            paddingBottom: -2,
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Button
            sx={{ justifyContent: "center" }}
            variant="contained"
            startIcon={<PictureAsPdfIcon />}
            onClick={() => toPDF()}
          >
            Download Answersheet
          </Button>
        </Box>
      )}
      <Box ref={targetRef}>
        <Box>
          {info && (
            <Paper sx={{ marginY: 4, padding: 4 }}>
              <MyItem left="Exam Name:" right={info.name} />
              <MyItem left="Score: " right={info.score} />
              <MyItem
                left="Allow Negative Marking:"
                right={info.allowNegativeMarking ? "True" : "False"}
              />
              <MyItem
                left="Number of Answered:"
                right={info.numberOfAnswered}
              />
              <MyItem left="Total Questions:" right={info.questionSize} />
            </Paper>
          )}
          <Paper sx={{ marginY: 4, padding: 4 }}>
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              justifyContent="center"
            >
              <Stack
                alignItems="center"
                spacing={2}
                justifyContent="space-evenly"
              >
                <RectangleIcon
                  fontSize="large"
                  sx={{ color: "darkseagreen" }}
                />
                <RectangleIcon fontSize="large" sx={{ color: "tomato" }} />
                <RectangleIcon
                  fontSize="large"
                  sx={{ color: "lightsteelblue" }}
                />
              </Stack>
              <Stack
                alignItems="flex-start"
                spacing={3.5}
                justifyContent="space-evenly"
              >
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
                  <Typography variant="body1" sx={{pb: 4}}>
                    {`${index + 1}. ${q.question}`}
                  </Typography>

                  {
                    <>
                      <ListItem
                        sx={{
                          margin: 0.5,
                          border: `${getBorderColor("optionA", q.selected, q.correctAnswer)}`,
                          borderRadius: 2,
                          backgroundColor: `${getBGColor("optionA", q.selected, q.correctAnswer)}`,
                        }}
                      >
                        A. {q.optionA}
                      </ListItem>
                      <ListItem
                        sx={{
                          margin: 0.5,
                          border: `${getBorderColor("optionB", q.selected, q.correctAnswer)}`,
                          borderRadius: 2,
                          backgroundColor: `${getBGColor("optionB", q.selected, q.correctAnswer)}`,
                        }}
                      >
                        B. {q.optionB}
                      </ListItem>
                      <ListItem
                        sx={{
                          margin: 0.5,
                          border: `${getBorderColor("optionC", q.selected, q.correctAnswer)}`,
                          borderRadius: 2,

                          backgroundColor: `${getBGColor("optionC", q.selected, q.correctAnswer)}`,
                        }}
                      >
                        C. {q.optionC}
                      </ListItem>
                      <ListItem
                        sx={{
                          margin: 0.5,
                          border: `${getBorderColor("optionD", q.selected, q.correctAnswer)}`,
                          borderRadius: 2,
                          backgroundColor: `${getBGColor("optionD", q.selected, q.correctAnswer)}`,
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
      </Box>
    </>
  );
};

export default CompletedExam;
