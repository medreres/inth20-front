import { Box, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";

const arr = [1, 2, 3, 4];

const BestRecipes = () => {
  const navigate = useNavigate();
  return (
    <Stack direction="column">
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
          <DishCard mealName="Dumplings" key={i} />
        ))}
      </Box>
      <Link
        onClick={(e) => window.scrollTo({ top: 0 })}
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
  );
};

export default BestRecipes;
