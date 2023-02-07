export const API_URL = "https://www.themealdb.com/api/json/v2/9973533";

export { default as searchRecipe } from "./searchRecipe";
export { default as saveRecipe } from "./saveRecipe";
export { default as removeRecipe } from "./removeRecipe";
export { default as savedRecipes } from "./savedRecipes";

export { default as randomRecipe } from "./randomRecipe";
export { default as latestRecipe } from "./latestRecipe";

export { default as addIngredient } from "./addIngredient";
export { default as deleteIngredient } from "./deleteIngredient";
export { default as savedIngredients } from "./savedIngredients";

export { default as savedCategories } from "./savedCategories";

export interface IngredientToSave {
  title: string;
  category: {
    id: string;
    title: string;
  };
  amount: string;
}
