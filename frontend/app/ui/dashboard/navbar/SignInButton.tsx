"use client";
import {
  Alert,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import GoogleSignInButton from "./GoogleSignInButton";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import { signIn } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const SignInButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleBtnClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const router = useRouter();
  const pathName = usePathname();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const handleSignIn = async (provider: string) => {
    try {
      const result = await signIn(provider, {
        callbackUrl: pathName,
        redirect: false,
      });
      if (result?.error) {
        setErrorMessage("Sign-in failed. Please try again.");
        setOpen(true);
      }
    } catch (e) {
      setErrorMessage("An unexpected error occurred during sign-in.");
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
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
        <MenuItem onClick={() => handleSignIn("google")}>
          <ListItemIcon>
            <GoogleIcon></GoogleIcon>
          </ListItemIcon>
          <ListItemText>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              Sign in with Google
            </Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleSignIn("facebook")}>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignInButton;
