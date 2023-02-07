import { API_URL } from "../index";
import { Recipe } from "../../interface/index";
import axios from "axios";
import searchById from "./searchById";

export default async function searchRecipeByIngredients(ingredients: string) {
  return axios.get(API_URL + "/filter.php?i=" + ingredients).then(async ({ data }) => {
    const meals: Recipe[] = await Promise.all(
      data.meals.map(async (meal: any) => {
        const response = await searchById(meal.idMeal);
        return response;
      })
    );

    return meals as Recipe[];
  });
}
