import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import searchRecipe, { Recipe } from "../features/Recipes/api/searchRecipe";
import DishCard from "../features/Recipes/components/DishCard";
import SearchForm from "../features/Recipes/components/SearchForm";

export default function SearchRecipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  // send request to get all the recipes
  useEffect(() => {
    searchRecipe("").then((result) => setRecipes(result));
  }, []);

  console.log(recipes);

  return (
    // TODO send request for searched meal

    // TODO create loading spinner

    // TODO handle empty list
    // if recipes.length === 0
    <Box
      mx="6em"
      my="5em">
      <SearchForm setSearchResults={setRecipes} />
      <Box
        my="4em"
        gap={1}
        display="flex"
        flexWrap="wrap">
        {recipes.map((el, index) => (
          <DishCard
            key={index}
            mealName={el.strMeal}
            imageUrl={el.strMealThumb}
          />
        ))}
      </Box>
    </Box>
  );
}
