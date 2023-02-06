import { API_URL } from './index';
import { RecipeToSave } from './../interface/index';
import axios from "axios";
export default async function saveRecipe(recipe: RecipeToSave, id_token: string) {
  console.log(recipe);
  return axios
    .post(
      API_URL + "/recipes",
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

