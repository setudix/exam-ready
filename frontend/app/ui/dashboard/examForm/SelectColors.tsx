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
import colors from "./colors";

type SelectColorProps = {
  value: string;
  setValue: (s: string | any) => void;
};

const SelectColors = ({ value, setValue }: SelectColorProps) => {


  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <>
      <Select
        value={value}
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