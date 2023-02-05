import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export default function ContactBanner() {
  return (
    <Grid container
      display="flex"
      justifyContent={{xs: "center", md: "space-between"}}
      alignItems="center"
      px='6em'
      py={{ xs: 10, md: 15}}
      style={{
        backgroundColor: "#28D681", // secondary light
      }}>
      <Grid item xs={12} md={6} pb={{xs: "48px", md: "0"}}>
      <Typography
        variant="h2"
        color="primary">
        Any questions? Contact us
      </Typography>
      </Grid>
      <Grid item xs={12} md={6}>
      <Typography
        variant="h2"
        color="primary">
        infridge@gmail.com
      </Typography>
      </Grid>
      

    </Grid>
  );
}
