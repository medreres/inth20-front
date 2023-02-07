import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import searchRecipe from "../api/recipes/searchRecipe";

// create latency in order not to storm server with request on each letter

export default function SearchForm({ dishName, handleDishNameChange, handleDifficultyChange }: any) {
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
          onChange={handleDishNameChange}
          value={dishName}
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
            onChange={handleDifficultyChange}
            color="secondary"
            labelId="demo-simple-select-label"
            id="difficulty"
            label="Difficulty"
            defaultValue="all">
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}
