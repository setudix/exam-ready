import React from 'react';
import Grid from "@mui/material/Grid2";
import { AutoAwesome, EmojiEvents, TrendingUp } from '@mui/icons-material';
import { Card, CardContent, Typography } from '@mui/material';

const FeaturesComponent = () => {
const features = [
    {
      icon: <AutoAwesome />,
      title: "AI-Powered Precision",
      description: "Tailored questions to boost your exam performance"
    },
    {
      icon: <TrendingUp />,
      title: "Practice Smarter",
      description: "Adaptive learning paths for rapid improvement"
    },
    {
      icon: <EmojiEvents />,
      title: "Exam Confidence",
      description: "Real-time feedback and progress tracking"
    }
  ];

  return (
    <Grid container spacing={3} 
      margin="4rem"
      paddingX={{xs:"2rem", md:"10rem", xl:"15rem"}}
    >
      {features.map((feature, index) => (
        <Grid  size={{xs:12, md:4}} key={index}>
          <Card raised sx={{height: "100%", width: "100%", borderRadius:4}}>
            <CardContent sx={{ textAlign: 'center' }}>
              {React.cloneElement(feature.icon, { fontSize: 'large', color: 'primary', sx: { mb: 2 } })}
              
              <Typography variant="h5" component="h2" gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {feature.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FeaturesComponent;