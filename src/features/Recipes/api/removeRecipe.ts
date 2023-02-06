import { API_URL } from './index';
import axios from "axios";
export default async function removeRecipe(recipeId: string, id_token: string) {
  return axios
    .delete(API_URL + `/recipes/${recipeId}`, {
      headers: {
        "Authorization-Google": id_token,
      },
    })
    .then((response) => response);
}
