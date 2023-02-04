import { Button, OutlinedInputProps, styled, TextField, TextFieldProps, Typography } from "@mui/material";
import { alpha, Box, Stack } from "@mui/system";
import img from "../../assets/browserecipes-bkg.jpg";
import React from "react";
import { Link } from "react-router-dom";
import DishCard from "./DishCard";
// import { Search } from "react-router-dom";

const arr = [1, 2, 3, 4];

const Searchbar = styled((props: TextFieldProps) => (
  <TextField
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    color: '#fff',
    backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
    transition: theme.transitions.create(["border-color", "background-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&.Mui-focused": {
      backgroundColor: "transparent",
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function FindRecipes() {
  return (
    <Box
      sx={{
        backgroundColor: "#A4A4A4",
        backgroundImage: `url(${img})`,
        backgroundPosition: "center",
        backgroundSize: "100%",
        backgroundRepeat: "no-repeat",
      }}
      // backgroundImage={img}
      position="relative"
      minHeight="10em"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={15}>
      <Stack direction="column">
        <Typography
          gutterBottom
          variant="h2"
          color="primary">
          Find your favorite recipes
        </Typography>
        <Searchbar
          label="Search Recipes"
          variant="filled"
          color="primary"
        />
      </Stack>
    </Box>
  );
}
