"use client";
import React from "react";
import { Box, Typography, Button, Container, Collapse, Fab } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ReactTyped } from "react-typed";
import { teal, grey, cyan } from "@mui/material/colors";
const GradientBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(to bottom, ${teal[500]} , ${teal[800]}, ${cyan[900]})`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(10, 0),
}));

const HeroComponent = () => {
  return (
    <GradientBox>
      <Container maxWidth="md">
        <Box textAlign="center">
          <Typography variant="h2" sx={{ fontWeight: "bold" }} gutterBottom>
            Exam Ready
          </Typography>
        
            <Typography variant="h5" paragraph sx={{ fontWeight: "bold"}}>
              AI-powered MCQs to ace your exams
            </Typography>
        
          <Typography variant="body1" sx={{ mb: 4 }}>
            Prepare for your{" "}
            <ReactTyped
              strings={[
                "Math exam",
                "Science test",
                "History quiz",
                "Language assessment",
                "Coding interview",
              ]}
              typeSpeed={40}
              backSpeed={50}
              loop
            />
          </Typography>


          <Fab 
          variant="extended"
          color='primary'
          sx={{fontWeight:"bold"}}>
            Start Practicing Now
          </Fab>
        </Box>
      </Container>
    </GradientBox>
  );
};

export default HeroComponent;
