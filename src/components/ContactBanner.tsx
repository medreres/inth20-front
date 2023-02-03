import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ContactBanner() {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px='5em'
      py={10}
      style={{
        backgroundColor: "#A4A4A4", // secondary light
      }}>
      <Typography
        variant="h1"
        color="primary">
        Any questions? Contact us
      </Typography>
      <Typography
        variant="h1"
        color="primary">
        infridge@gmail.com
      </Typography>
    </Box>
  );
}
