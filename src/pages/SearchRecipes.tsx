import { Grid, SelectChangeEvent } from "@mui/material";
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
    searchRecipe(dishName).then((result) => setRecipes(result.slice(0, 24)));
  }, [difficulty, dishName, setSearchParams]);

  useEffect(() => {
    // filter incoming response
    if (difficulty === "all") return;

    setRecipes(filterByDifficulty(recipes, difficulty));
  }, [difficulty, recipes]);

  return (
    // TODO send request for searched meal

    // TODO create loading spinner

    // TODO handle empty list
    // if recipes.length === 0
    <Grid container p={{xs:"36px 36px", md:"48px 96px"}}>
      <Grid item xs={12} >
        <SearchForm
          dishName={dishName}
          handleDishNameChange={handleDishNameChange}
          handleDifficultyChange={handleDifficultyChange}
          fullWidth
        />
      </Grid>
      <Grid item 
        xs={12}
        gap={{xs: 4, sm: 6, md: 8}}
        my={{xs: "48px", md: "64px"}}
        display="flex"
        flex-direction="row"
        justifyContent={{xs: "start"}}
        flexWrap="wrap">
        {recipes.map((recipe) => (
          <Grid item xs={8} sm={3}>
            <DishCard
              key={recipe.idMeal}
              data={recipe}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
