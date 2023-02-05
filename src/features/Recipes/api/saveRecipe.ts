import axios from "axios";
import { Recipe } from "./../interface/index";
export default async function saveRecipe(recipe: RecipeToSave) {
  return axios
    .post(
      "https://int20h.onrender.com/recipes",
      {},
      {
        data: {
          recipe,
        },
      }
    )
    .then(({ data }) => (data.meals as Recipe[]) ?? []);
}

interface RecipeToSave {
  title: string;
  category: string;
  instructions: string;
  pic: string;
  youtube_url: string;
  ingredients: Ingredient[];
}

interface Ingredient {
  title: string;
  amount: string;
}
