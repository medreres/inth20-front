import axios from "axios";

export const getRecipes = async (idToken: string) => {
  return fetch("https://int20h.onrender.com/recipes", {
    headers: {
      "Authorization-Google": idToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
//   return axios
//     .get("http://int20h.onrender.com/recipes", {
//       headers: {
//         "Authorization-Google": idToken,
//         // "Content-Type": "application/json",
//       },
//     })
//     .then(({ data }) => {
//         console.log(data)
//         return data;
//     })
//     .catch((err) => err);
};
