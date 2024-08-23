"use client";

import React from "react";

import { signIn } from "next-auth/react";
import { Button } from "@mui/material";
const GoogleSignInButton = () => {
  return (
    <Button variant="contained" color="secondary" onClick={() => signIn("google")}>
      SignIn With Google
    </Button>
  );
};

export default GoogleSignInButton;
