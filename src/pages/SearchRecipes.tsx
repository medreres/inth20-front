import { SelectChangeEvent } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import searchRecipe from "../features/Recipes/api/searchRecipe";
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
    searchRecipe(dishName).then((result) => setRecipes(result));
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
    <Box
      mx="6em"
      my="5em">
      <SearchForm
        dishName={dishName}
        handleDishNameChange={handleDishNameChange}
        handleDifficultyChange={handleDifficultyChange}
      />
      <Box
        my="4em"
        gap={1}
        display="flex"
        flexWrap="wrap">
        {recipes.map((recipe) => (
          <DishCard
            key={recipe.idMeal}
            data={recipe}
          />
        ))}
      </Box>
    </Box>
  );
}
