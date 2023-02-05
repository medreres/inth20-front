import styled from "@emotion/styled";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useRef } from "react";
import searchRecipe from "../api/searchRecipe";

// create latency in order not to storm server with request on each letter

export default function SearchForm({ setSearchResults }: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const difficultyRef = useRef<HTMLSelectElement>(null);

  const handleChange = () => {
    if (nameRef.current?.value == null || difficultyRef.current?.value == null) return;

    const dishName = nameRef.current!.value;
    const difficulty = difficultyRef.current!.value;



    searchRecipe(dishName, difficulty).then((result) => setSearchResults(result));
  };
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
          onChange={handleChange}
          inputRef={nameRef}
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
            onChange={handleChange}
            inputRef={difficultyRef}
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
