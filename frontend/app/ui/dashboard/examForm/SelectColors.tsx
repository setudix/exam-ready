import {
  Box,
  Grid2,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";

type SelectColorProps = {
  value: string;
  setValue: (s: string | any) => void;
};

const SelectColors = ({ value, setValue }: SelectColorProps) => {
  const colors = [
    "#a3a3a3",
    "#475569",
    "#020617",
    "#f87171",
    "#b91c1c",
    "#fb923c",
    "#ea580c",
    "#7c2d12",
    "#fcd34d",
    "#a3e635",
    "#65a30d",
    "#16a34a",
    "#064e3b",
    "#22d3ee",
    "#0369a1",
    "#8b5cf6",
    "#581c87",
    "#f472b6",
    "#db2777",
    "#9f1239",
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <>
      <Select
        value={value}
        // label="Pick a color"
        onChange={handleChange}
        renderValue={() => <CircleIcon sx={{ color: value }} />}
        native={false}
        displayEmpty={true}
        autoWidth
        MenuProps={{PaperProps: {
              sx: {
                width: 300,
                maxHeight: 200,
                '& .MuiList-root': {
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  // gap: '1px',
                  padding: '1px',
                },
              },}}}
      >
        {colors.map((color) => (
          <MenuItem key={color} value={color} >
            <CircleIcon sx={{ color: color  }} />
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectColors;