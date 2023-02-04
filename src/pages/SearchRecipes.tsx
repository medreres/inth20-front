import { Box } from "@mui/system";
import React from "react";
import DishCard from "../features/Recipes/DishCard";
import SearchForm from "../features/Recipes/SearchForm";

const arr = [1, 2, 3, 4, 5, 6, 10];

export default function SearchRecipes() {
  return (
    <Box
      mx="6em"
      my="5em">
      <SearchForm />
      <Box
        my="4em"
        gap={1}
        display="flex"
        flexWrap="wrap">
        {arr.map((el) => (
          <DishCard key={el} />
        ))}
      </Box>
    </Box>
  );
}
