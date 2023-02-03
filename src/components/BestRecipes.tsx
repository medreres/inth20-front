import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import DishCard from "./DishCard";

const arr = [1, 2, 3, 4];

const BestRecipes = () => {
  return (
    <Stack
      direction="column"
      mx="6em">
      <Typography variant="h1">Best Recipes of The Day</Typography>
      <Box
        display="flex"
        justifyContent="space-between"
        gap={3}
        my={5}
        // m={3}
      >
        {arr.map((i) => (
          <DishCard key={i} />
        ))}
      </Box>
      <Button
        // alignSelf="center"
        style={{
          alignSelf: "center",
          marginBottom: "3em",
        }}
        variant="outlined"
        color="secondary">
        See More
      </Button>
    </Stack>
  );
};

export default BestRecipes;
