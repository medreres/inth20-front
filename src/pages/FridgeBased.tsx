import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getRecipes } from "../api/mealDb";
import { searchRecipe, searchRecipeByIngredients } from "../features/Recipes/api";
import DishCard from "../features/Recipes/components/DishCard";
import { Recipe } from "../features/Recipes/interface";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FridgeBased() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchParams] = useSearchParams();
  const [ingredients, setIngredients] = useState<string | null>(searchParams.get("ingredients"));
  useEffect(() => {
    searchRecipeByIngredients(ingredients as string).then((recipes) => {
      console.log(recipes);
      setRecipes(recipes);
    });
  }, [ingredients]);

  // console.log('hi')

  return (
    <Grid
      container
      p={{ xs: "36px 36px", md: "48px 96px" }}>
      <Grid
        item
        xs={12}>
        <Button
          color="inherit"
          onClick={() => window.history.back()}
          style={{ cursor: "pointer", fontWeight: "700", textTransform: "capitalize", padding: ".5em" }}>
          <ArrowBackIcon
            sx={{
              mr: { xs: "16px", md: "32px" },
            }}
          />
          Back
        </Button>
      </Grid>
      <Grid
        xs={12}
        mt={4}
        item>
        <Typography variant="h1">Here what I came up with</Typography>
      </Grid>
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
        {recipes.map((recipe) => (
          <DishCard
            key={recipe.idMeal}
            data={recipe}
          />
        ))}
      </Grid>
    </Grid>
  );
}
