"use client";
import React, { useEffect, useState } from "react";
import CompletedExamDataType from "./types/CompletedExamDataType";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  Button,
  Box,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MyItem from "./MyItem";
import Link from "next/link";
import routes from "@/app/routes";

type props = {
  data: CompletedExamDataType[];
};
const ExamHistory = ({ data }: props) => {
  const [page, setPage] = useState(1);
  const accordionsPerPage = 5;

  const handleChange = (event: any, value: any) => {
    setPage(value);
  };

  const indexOfLastAccordion = page * accordionsPerPage;
  const indexOfFirstAccordion = indexOfLastAccordion - accordionsPerPage;
  var currentAccordions = data.slice(
    indexOfFirstAccordion,
    indexOfLastAccordion
  );

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <>
      <Container sx={{margin:4, padding:4}}>
        {data.map((element: CompletedExamDataType, index) => (
          <Accordion sx={{ borderRadius: 2, marginY: 4, padding: 1 }}>
            <AccordionSummary key={index} expandIcon={<ExpandMoreIcon />}>
              <Stack direction="row" spacing={2}>
                <CircleIcon sx={{ color: element.examWithoutUserDTO?.color }} />
                <Typography variant="body1">
                  {element.examWithoutUserDTO?.name}
                </Typography>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <MyItem
                left="Exam Name:"
                right={element.examWithoutUserDTO.name}
              />
              <MyItem left="Score: " right={element.examWithoutUserDTO.score} />
              <MyItem
                left="Negative Marking Allowed?:"
                right={
                  element.examWithoutUserDTO.allowNegativeMarking
                    ? "True"
                    : "False"
                }
              />
              <MyItem
                left="Number of Answered:"
                right={element.examWithoutUserDTO.numberOfAnswered}
              />
              <MyItem
                left="Total Questions:"
                right={element.examWithoutUserDTO.questionSize}
              />

              <Box
                sx={{ padding: 2, display: "flex", justifyContent: "center" }}
              >
                <Link href={`${routes.fe_getExamAnswerWithId}/${element.examWithoutUserDTO?.id}`}>
                <Button
                  sx={{ justifyContent: "center" }}
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  
                  >
                  View Answers
                </Button>
                  </Link>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </>
  );
};
export default ExamHistory;
