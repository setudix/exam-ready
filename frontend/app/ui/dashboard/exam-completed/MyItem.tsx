import { ListItem, Stack, Typography, Box } from "@mui/material";
import React from "react";

type props = {
  left: string;
  right: string;
};
const MyItem = ({left, right}:props) => {
  return (
    <ListItem sx={{ margin: 0.5, backgroundColor: "whitesmoke" , borderRadius: 2}}>
      <Box sx={{flexGrow:1}}>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body1">{left}</Typography>
        <Typography variant="body1">{right}</Typography>
      </Stack>
      </Box>
    </ListItem>
  );
};

export default MyItem;
