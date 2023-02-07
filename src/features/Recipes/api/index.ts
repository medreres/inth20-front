export const API_URL = "https://www.themealdb.com/api/json/v2/9973533";

export { default as searchRecipe } from "./recipes/searchRecipe";
export { default as saveRecipe } from "./recipes/saveRecipe";
export { default as removeRecipe } from "./recipes/removeRecipe";
export { default as savedRecipes } from "./recipes/savedRecipes";

export { default as randomRecipe } from "./recipes/randomRecipe";
export { default as latestRecipe } from "./recipes/latestRecipe";

export { default as addIngredient } from "./ingredients/addIngredient";
export { default as deleteIngredient } from "./ingredients/deleteIngredient";
export { default as savedIngredients } from "./ingredients/savedIngredients";

export { default as savedCategories } from "./categories/savedCategories";

export interface IngredientToSave {
  title: string;
  category: {
    id: string;
    title: string;
  };
  amount: string;
}
