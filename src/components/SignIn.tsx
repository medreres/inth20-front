import { Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import GoogleAuth from "../features/Auth/components/GoogleAuth";

export default function SignIn() {
  return (
    <Stack
      p={{ xs: "36px 36px", md: "48px 96px" }}
      height="70vh"
      gap={5}
      direction="column"
      alignItems="center"
      justifyContent="center">
      <Typography
        variant="h1"
        color="secondary">
        You need to sign in
      </Typography>
      <GoogleAuth />
    </Stack>
  );
}
