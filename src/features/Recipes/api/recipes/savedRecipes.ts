import { RecipeToSave } from "../../interface/index";
import axios from "axios";
export default async function savedRecipes(id_token: string) {
  return axios
    .get("https://int20h.onrender.com/recipes", {
      headers: {
        "Authorization-Google": id_token,
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data as RecipeToSave[] )
    // .catch((err) => err as string);
}
