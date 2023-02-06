import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import BestRecipes from "../features/Recipes/components/BestRecipes";
import DishCard from "../features/Recipes/components/DishCard";
import FindRecipes from "../features/Recipes/components/FindRecipes";
import LatestRecipes from "../features/Recipes/components/LatestRecipes";
// import DishCard from "../features/Recipes/DishCard";
// import FindRecipes from "../features/Recipes/FindRecipes";

export default function Recipes() {
  return (
    <Box
      mx="6em"
      my={5}>
      <FindRecipes />

      {/* <Stack
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
              // TODO fix temp placeholder
              key={i}
              data={{} as any}
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
      </Stack> */}

      <BestRecipes />
      <LatestRecipes />
      {/* <Stack
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
              // TODO fix
              data={{} as any}
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
      </Stack> */}
    </Box>
  );
}
