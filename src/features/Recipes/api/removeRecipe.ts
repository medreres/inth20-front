import axios from "axios";
export default async function removeRecipe(recipeId: string, id_token: string) {
  return axios
    .delete(`https://int20h.onrender.com/recipes/${recipeId}`, {
      headers: {
        "Authorization-Google": id_token,
      },
    })
    .then(response => {
      console.log(recipeId)
      console.log(response)
      return response
    });
}
