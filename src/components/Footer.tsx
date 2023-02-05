import { Grid, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";

export default function Footer() {
  return (
    <Grid container
      p="5em"
      display="flex"
      flex="1"
      justifyContent="space-between"
      sx={{
        backgroundColor: "#E9FFF4",
      }}>
  
      <Grid item xs={12} sm={4}
        display="flex"
        justifyContent="space-between">
        <Typography
          variant="h2"
          color="primary_secondary">
          InFridge.
        </Typography>
      </Grid>
        <Grid item xs={12} sm={4} gap={1}>
          <Typography variant="body1">My Fridge</Typography>
          <Typography variant="body1">Shopping List</Typography>
        </Grid>
        <Grid item xs={12} sm={4} gap={1}>
          <Typography variant="body1">Browse Recipes</Typography>
          <Typography variant="body1">Saved Recipes</Typography>
        </Grid>
      <Typography
        pt={5}
        variant="body1">
        Random © 2023
      </Typography>
    </Grid>
  );
}
