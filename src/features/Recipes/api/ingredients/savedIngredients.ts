import { IngredientToSave } from "../index";
import axios from "axios";
export default async function savedIngredients(id_token: string) {
  return axios
    .get("https://int20h.onrender.com/ingredients", {
      headers: {
        "Authorization-Google": id_token,
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data as IngredientToSave[])
    // .catch((err) => err);
}
