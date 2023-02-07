import { Box, Button, Grid, Stack, Typography } from "@mui/material";
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
    <Grid spacing={4} p={{xs:"36px 36px", md:"48px 96px"}}>
      <Grid item mb={{xs: "48px",  md: "96px"}}>
        <FindRecipes />
      </Grid>
      <Grid item>
        <BestRecipes />
      </Grid>
      <Grid item>
        <LatestRecipes />
      </Grid>
    </Grid>
  );
}
