import { RecipeToSave } from '../../interface/index';
import axios from "axios";
export default async function saveRecipe(recipe: RecipeToSave, id_token: string) {
  console.log(recipe);
  return axios
    .post(
      "https://int20h.onrender.com/recipes",
      { ...recipe },
      {
        headers: {
          "Authorization-Google": id_token,
          "Content-Type": "application/json",
        },
      }
    )
    .then(({ data }) => data)
    .catch((err) => err);
}

