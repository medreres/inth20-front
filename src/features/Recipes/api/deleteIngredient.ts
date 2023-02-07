import axios from "axios";

export default async function deleteIngredient(ingredientId: string, id_token: string) {
  return axios
    .delete("https://int20h.onrender.com/ingredient/" + ingredientId, {
      headers: {
        "Authorization-Google": id_token,
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => data)
    .catch((err) => err);
}
