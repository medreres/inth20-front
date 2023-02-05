import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "../features/Recipes/components/DishCard";
import FindRecipes from "../features/Recipes/components/FindRecipes";
// import DishCard from "../features/Recipes/DishCard";
// import FindRecipes from "../features/Recipes/FindRecipes";

const arr = [1, 2, 3, 4];

export default function Recipes() {
  const navigate = useNavigate();

  return (
    <Box
      mx="6em"
      mt={5}>
      <FindRecipes />

      <Stack
        direction="column"
        my={5}>
        <Typography variant="h1">Best Recipes of The Day</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          // gap={3}
          my={5}
          flexWrap="wrap"
          // m={3}
        >
          {arr.map((i) => (
            <DishCard
              mealName="Dumplings"
              key={i}
            />
          ))}
        </Box>
        <Link
          to={"/browse-recipes"}
          style={{ textDecoration: "none", alignSelf: "center", marginBottom: "3em" }}>
          <Button
            // alignSelf="center"
            variant="outlined"
            color="secondary">
            See More
          </Button>
        </Link>
      </Stack>

      <Stack
        direction="column"
        my={5}>
        <Typography variant="h1">Latest Recipes</Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          // gap={3}
          my={5}
          flexWrap="wrap"
          // m={3}
        >
          {arr.map((i) => (
            <DishCard
              mealName="Dumplings"
              key={i}
            />
          ))}
        </Box>
        <Link
          to={"/browse-recipes"}
          style={{ textDecoration: "none", alignSelf: "center", marginBottom: "3em" }}>
          <Button
            // alignSelf="center"
            variant="outlined"
            color="secondary">
            See More
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
