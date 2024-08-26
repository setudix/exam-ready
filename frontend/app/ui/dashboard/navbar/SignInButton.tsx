import {
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import GoogleSignInButton from "./GoogleSignInButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from '@mui/icons-material/Facebook';
import { signIn } from "next-auth/react"


const SignInButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Button
        color="inherit"
        variant="text"
        onClick={handleBtnClick}
        // sx={{
        //   color: "white",
        //   borderColor: "white",
        //   "&:hover": {
        //     bgcolor: "rgba(255, 255, 255, 0.08)",
        //     borderColor: "white",
        //   },
        // }}
        startIcon={<LoginIcon />}
      >
        <Typography variant="subtitle2"> Sign In </Typography>
      </Button>

      <Menu
        sx={{ mt: "45px" }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorEl)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => signIn("google")}>
          <ListItemIcon>
            <GoogleIcon></GoogleIcon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Sign in with Google
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => signIn("facebook")}>
          <ListItemIcon>
            <FacebookIcon></FacebookIcon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Sign in with Facebook
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default SignInButton;
