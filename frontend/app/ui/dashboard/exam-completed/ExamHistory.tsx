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
  Tooltip,
  Select,
  MenuItem,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CircleIcon from "@mui/icons-material/Circle";

import VisibilityIcon from "@mui/icons-material/Visibility";
import MyItem from "./MyItem";
import Link from "next/link";
import routes from "@/app/routes";
import SelectColors from "../examForm/SelectColors";
import PaletteIcon from "@mui/icons-material/Palette";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import colors from "../examForm/colors";
import CurrencyYenTwoTone from "@mui/icons-material/CurrencyYenTwoTone";
import dateHelper from "./types/datehelper";
type props = {
  data: CompletedExamDataType[];
};
const ExamHistory = ({ data }: props) => {
  const [page, setPage] = useState(1);
  const accordionsPerPage = 5;
  const [examColor, setExamColor] = useState("");
  const [current, setCurrent] = useState<CompletedExamDataType[]>();
  const handleChange = (event: SelectChangeEvent) => {
    setExamColor(event.target.value);
  };

  const indexOfLastAccordion = page * accordionsPerPage;
  const indexOfFirstAccordion = indexOfLastAccordion - accordionsPerPage;
  var currentAccordions = data.slice(
    indexOfFirstAccordion,
    indexOfLastAccordion
  );

  useEffect(() => {
    setCurrent(data);
  }, [data]);

  useEffect(() => {
    const filteredData = data.filter((d) => {
      if (examColor === "") {
        return true;
      }
      return d.examWithoutUserDTO?.color === examColor ? true : false;
    });
    setCurrent(filteredData);
  }, [examColor]);

  return (
    <>
      <Container sx={{ margin: 4, padding: 4 }}>
        {data.length > 0 && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <FilterAltIcon color="action" />
            <Box sx={{ flexGrow: 1 }}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="flex-start"
              >
                <Tooltip title="Selet a color to filter exams">
                  <Typography variant="subtitle1">
                    Filter out exams by color:{" "}
                  </Typography>
                </Tooltip>

                <Select
                  value={examColor}
                  onChange={handleChange}
                  renderValue={() =>
                    examColor === "" ? (
                      "None"
                    ) : (
                      <CircleIcon sx={{ color: examColor }} />
                    )
                  }
                  native={false}
                  displayEmpty={true}
                  autoWidth
                >
                  <MenuItem value="">None</MenuItem>
                  {colors.map((color) => (
                    <MenuItem key={color} value={color}>
                      <CircleIcon sx={{ color: color }} />
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Box>
          </Stack>
        )}
        {current && current.length > 0 ? (
          current.map((element: CompletedExamDataType, index) => (
            <Accordion sx={{ borderRadius: 2, marginY: 4, padding: 1 }}>
              <AccordionSummary key={index} expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={2}>
                  <CircleIcon
                    sx={{ color: element.examWithoutUserDTO?.color }}
                  />
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
                <MyItem
                  left="Exam Date:"
                  right={`${dateHelper(element.examWithoutUserDTO?.creationDate)}`}
                />
                <MyItem
                  left="Negative Marking Allowed?:"
                  right={
                    element.examWithoutUserDTO.allowNegativeMarking
                      ? "True"
                      : "False"
                  }
                />
                <MyItem
                  left="Total Questions:"
                  right={element.examWithoutUserDTO.questionSize}
                />
                <MyItem
                  left="Number of Answered:"
                  right={element.examWithoutUserDTO.numberOfAnswered}
                />

                <MyItem
                  left="Number of Correct:"
                  right={element.examWithoutUserDTO?.numberOfCorrect}
                />
                <MyItem
                  left="Score: "
                  right={element.examWithoutUserDTO.score}
                />
                <Box
                  sx={{ padding: 2, display: "flex", justifyContent: "center" }}
                >
                  <Link
                    href={`${routes.fe_getExamAnswerWithId}/${element.examWithoutUserDTO?.id}`}
                  >
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
          ))
        ) : (
          <Typography>No Data Found</Typography>
        )}
      </Container>
    </>
  );
};
export default ExamHistory;
