
import { AppBar, Box, Container, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from 'next/link';
import React from 'react';
import { cyan } from "@mui/material/colors";
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <AppBar position="static" color="primary" sx={{  marginTop: 4, bottom: 0 }}>
      <Toolbar>
        <Container maxWidth="md" sx={{ paddingTop:2, paddingBottom:2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Stack  alignItems="center" justifyContent="center">

          <Typography variant="body2" color="inherit">
            &copy; {currentYear} Team [DU_YIIT] 
          </Typography>
          <Typography variant="caption"  color="inherit">
            Therap JavaFest 2024
            </Typography>
          <Box>
            <Link href="https://github.com/setudix/exam-ready/" target='blank'>
              <IconButton color="inherit" aria-label="GitHub">
                <GitHubIcon />
              </IconButton>
            </Link>
          </Box>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
