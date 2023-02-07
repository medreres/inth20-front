export const API_URL = "https://www.themealdb.com/api/json/v2/9973533";

export { default as searchRecipe } from "./searchRecipe";
export { default as saveRecipe } from "./saveRecipe";
export { default as removeRecipe } from "./removeRecipe";
export { default as savedRecipes } from "./savedRecipes";
export { default as randomRecipe } from "./randomRecipe";
export { default as latestRecipe } from "./latestRecipe";

export interface IngredientToSave {
    title: string;
    category: {
      id: string;
      titie: string;
    };
    amount: string;
  }