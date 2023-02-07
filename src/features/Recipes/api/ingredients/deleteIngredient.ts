import axios from "axios";

export default async function deleteIngredient(ingredientId: string, id_token: string) {
  return axios
    .delete("https://int20h.onrender.com/ingredients/" + ingredientId, {
      headers: {
        "Authorization-Google": id_token,
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
