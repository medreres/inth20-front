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
};
