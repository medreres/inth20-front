import { Box, Button, Stack, Typography, Grid } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import randomRecipe from "../api/recipes/randomRecipe";
import { Recipe } from "../interface";
import DishCard from "./DishCard";

const BestRecipes = () => {
  const [randomRecipes, setRandomRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    randomRecipe(3).then((recipes) => {
      setRandomRecipes(recipes);
    });
  }, []);

  return (
    <Stack direction="column">
      <Typography variant="h1">Best Recipes of The Day</Typography>
      <Grid
        container
        spacing={{ xs: 4, md: 6 }}
        padding="64px 0">
        {randomRecipes.map((recipe) => (
          <Grid
            key={recipe.idMeal}
            item
            xs={12}
            sm={4}>
            <DishCard data={recipe} />
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
