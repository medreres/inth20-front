import { IngredientToSave } from "./index";

import axios from "axios";
export default async function addIngredient(ingredient: IngredientToSave, id_token: string) {
  return axios
    .post(
      "https://int20h.onrender.com/ingredients",
      { ...ingredient },
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
