import styled from "@emotion/styled";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React from "react";

export default function SearchForm() {
  return (
    <Box>
      <Typography
        gutterBottom={true}
        variant="body1"
        fontWeight="bold">
        Search results for
      </Typography>
      <Box
        display="flex"
        maxWidth="30em">
        <TextField
          sx={{
            width: "90em",
            marginRight: "1em",
          }}
          label="Dish Name"
          color="secondary"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel
            color="secondary"
            id="difficulty">
            Difficulty
          </InputLabel>
          <Select
            color="secondary"
            labelId="demo-simple-select-label"
            id="difficulty"
            label="Difficulty"
            defaultValue="easy">
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
