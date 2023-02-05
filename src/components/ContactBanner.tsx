import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ContactBanner() {
  return (
    <Box 
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      px='6em'
      mx='-6em'
      py={15}
      style={{
        backgroundColor: "#28D681", // secondary light
      }}>
      
      <Typography
        variant="h2"
        color="primary">
        Any questions? Contact us
      </Typography>
      <Typography
        variant="h2"
        color="primary">
        infridge@gmail.com
      </Typography>
    </Box>
  );
}
