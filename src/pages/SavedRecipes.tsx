import { CircularProgress, Grid } from "@mui/material";
import React from "react";
import DishCard from "../features/Recipes/components/DishCard";
import DishCardSaved from "../features/Recipes/components/DishCardSaved";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";

export default function SavedRecipes() {
  const { savedRecipes, isLoading } = useRecipeContext();

  if (isLoading)
    return (
      <Grid
        container
        p={{ xs: "36px 36px", md: "48px 96px" }}
        height="70vh"
        justifyContent="center"
        alignItems="center">
        <CircularProgress
          size="10em"
          style={{
            color: "#26D681",
          }}
        />
      </Grid>
    );

  return (
    <Grid
      container
      p={{ xs: "36px 36px", md: "48px 96px" }}>
      <Grid
        item
        xs={12}
        gap={{ xs: 4, sm: 6, md: 8 }}
        my={{ xs: "48px", md: "64px" }}
        display="flex"
        flex-direction="row"
        // minWidth='50vw'
        justifyContent={{ xs: "stretch" }}
        flexWrap="wrap">
        {savedRecipes.map((recipe) => (
          <Grid
            key={recipe.id}
            item
            xs={8}
            sm={3}>
            <DishCardSaved data={recipe} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
