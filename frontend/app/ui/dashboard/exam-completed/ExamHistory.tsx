"use client";
import React, { useEffect, useState } from "react";
import CompletedExamDataType from "./types/CompletedExamDataType";
import { Accordion, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";
import { DataArrayRounded } from "@mui/icons-material";

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
      
      {data.map((element: CompletedExamDataType, index) => {
        return (
          <Accordion sx={{borderRadius:2, marginY:4, padding:1 }}>
            <AccordionSummary key={index} expandIcon={<ExpandMoreIcon />}>
              <CircleIcon sx={{ color: element.examWithoutUserDTO?.color }} />
              <Typography variant="body1">
                {element.examWithoutUserDTO?.name}
                {index}
              </Typography>
            </AccordionSummary>
          </Accordion>
        );
      })}
    </>
  );
};
export default ExamHistory;
