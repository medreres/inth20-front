import { Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import React from "react";

export default function Footer() {
  return (
    <Stack
      direction="column"
      py="3em"
      >
      <Box
        display="flex"
        justifyContent="space-between">
        <Typography
          variant="h2"
          color="primary_secondary">
          InFridge.
        </Typography>
        <Stack gap={1}>
          <Typography variant="body1">My Fridge</Typography>
          <Typography variant="body1">Shopping List</Typography>
        </Stack>
        <Stack gap={1}>
          <Typography variant="body1">Browse Recipes</Typography>
          <Typography variant="body1">Saved Recipes</Typography>
        </Stack>
      </Box>
      <Typography
        pt={6}
        variant="body1">
        Random © 2023
      </Typography>
    </Stack>
  );
}
