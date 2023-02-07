import { CircularProgress, Grid, SelectChangeEvent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchRecipe from "../features/Recipes/api/recipes/searchRecipe";
import DishCard from "../features/Recipes/components/DishCard";
import SearchForm from "../features/Recipes/components/SearchForm";
import { Recipe } from "../features/Recipes/interface";
import { filterByDifficulty } from "../features/Recipes/utils";

export default function SearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [dishName, setDishName] = useState(searchParams.get("dish") ?? "");
  const handleDishNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setDishName(e.target.value);

  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") ?? "all");
  const handleDifficultyChange = (e: SelectChangeEvent<string>) => setDifficulty(e.target.value);

  // TODO make some latency before calls
  useEffect(() => {
    const params: any = {};
    if (dishName) params.dish = dishName;
    if (difficulty !== "all") params.difficulty = difficulty;

    // update url and save in history
    setSearchParams(params);
    window.history.pushState(params, "recipes");

    // send request
    searchRecipe(dishName).then((result) => {
      setIsLoading(false);
      setRecipes(result.slice(0, 24));
    });
  }, [difficulty, dishName, setSearchParams]);

  useEffect(() => {
    // filter incoming response
    if (difficulty === "all") return;

    setRecipes(filterByDifficulty(recipes, difficulty));
  }, [difficulty, recipes]);

  return (
    // TODO create loading spinner
    <Grid
      container
      justifyContent="center"
      p={{ xs: "36px 36px", md: "48px 96px" }}>
      <Grid
        item
        xs={12}>
        <SearchForm
          dishName={dishName}
          handleDishNameChange={handleDishNameChange}
          handleDifficultyChange={handleDifficultyChange}
          fullWidth
        />
      </Grid>
      <Grid
        container
        spacing={4}
        // gap={{xs: 4, sm: 4, md: 8}}
        my={{ xs: "36px", xl: "64px" }}
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: isLoading ? "center" : "flex-start",
        }}>
        {isLoading && (
          <CircularProgress
            style={{
              marginTop: "5em",
              color: "#26D681",
            }}
            size="10em"
          />
        )}
        {!isLoading && (
          <>
            {recipes.map((recipe) => (
              <Grid
                key={recipe.idMeal}
                item
                xs={12}
                sm={4}
                md={3}>
                <DishCard
                  key={recipe.idMeal}
                  data={recipe}
                />
              </Grid>
            ))}
            {recipes.length === 0 && (
              <Grid
                item
                // xs={12}
                // sm={4}
                // md={3}
              >
                <Typography
                  variant="h2"
                  noWrap>
                  Oops! We don't have any recipes like that!
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
}
