import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DishCard from "./DishCard";

const arr = [1, 2, 3];

const BestRecipes = () => {
  const navigate = useNavigate();
  const handleDishClick = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <Stack direction="column">
      <Typography variant="h1">Best Recipes of The Day</Typography>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        padding="64px 0">
        {arr.map((i) => (
          <Grid
            key={i}
            item
            xs={12}
            sm={4}>
            <Link
              // TODO meaningful dishcards
              to="/recipe"
              style={{ textDecoration: "none" }}>
              <DishCard mealName="dumplings" />
            </Link>
          </Grid>
        ))}
      </Grid>
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
