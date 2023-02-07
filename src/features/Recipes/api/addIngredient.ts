import { Ingredient } from "./../interface/index";
import axios from "axios";
export interface IngredientToSave {
  title: string;
  category: {
    id: string;
    titie: string;
  };
  amount: string;
}
export default async function addIngerdient(ingredient: IngredientToSave, id_token: string) {
  return axios
    .post(
      "https://int20h.onrender.com/ingredient",
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
