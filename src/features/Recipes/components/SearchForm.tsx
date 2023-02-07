import styled from "@emotion/styled";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useCallback, useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import searchRecipe from "../api/searchRecipe";

// create latency in order not to storm server with request on each letter

export default function SearchForm({ dishName, handleDishNameChange, handleDifficultyChange }: any) {
  return (
    <Grid container>
      <Grid item xs={12} pb="16px">
        <Typography
          gutterBottom={true}
          variant="body1"
          fontWeight="bold">
          Search results for
        </Typography>
        </Grid>
      <Grid item xs={12} sm={6} md={5}
        display="flex"
        mb={{xs: "24px", sm: "0"}}
      >
        <TextField
          onChange={handleDishNameChange}
          value={dishName}
          fullWidth
          sx={{
            marginRight: "1em",
          }}
          label="Dish Name"
          color="secondary"
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6} sm={3} md={2}>
        <FormControl fullWidth>
          <InputLabel
            color="secondary"
            id="difficulty"
          >
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
      </Grid>
    </Grid>
  );
}
