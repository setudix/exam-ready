import { Box, ListItem, Paper, Typography } from '@mui/material';
import React from 'react'

type prop = {
  questions: Array<any>;
};
const CompletedExam = ({questions} : prop) => {

  return (
    <>
    <Box
      sx={{flexGrow:1}}
    >

    {questions.map(
        (q, index) => (
          <Paper
          key={index}
          sx={{marginBottom:4, padding:4}}
          >
            <Typography
            variant="body1"
            >
              {`${index + 1}. ${q.question}`}
            </Typography>

            {q.options.map((option:any, optionIdx:any) => (
              <ListItem
              key={optionIdx}
              sx={{
                margin:0.5,
                border:"1pt green solid",
                borderRadius: 2,
              }}
              >
                <Typography 
                variant="body1"
                >
                  {option}
                </Typography>
              </ListItem>
            ))}
          </Paper>
        )
        )
      }
      </Box>
    </>
  )
}

export default CompletedExam