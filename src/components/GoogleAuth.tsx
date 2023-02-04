import React, { useState } from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";
import { Google } from "@mui/icons-material";
import { Typography } from "@mui/material";

const GoogleAuthButton = styled(Button)({
  border: "2px solid",
  fontWeight: 500,
  borderRadius: "8px",
  padding: "8px 16px",
  textTransform: "none",
  lineHeight: "27px",
  margin: "24px ",
});

const GoogleAuth = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    flow: "auth-code",
  });

  return (
    <div>
      <GoogleAuthButton
        variant="contained"
        sx={{
          color: "#28D681",
          background: "#28D681",
        }}
        onClick={() => login()}>
        <Google color="primary" />{" "}
        <Typography
          ml={0.5}
          variant="body1"
          fontWeight="bold"
          color="primary">
          Sign in with Google
        </Typography>
      </GoogleAuthButton>
    </div>
  );
  googleLogout();
};

export default GoogleAuth;
