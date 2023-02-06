import { Recipe, Ingredient } from "./../interface/index";
export const formatIngredients = (recipe: Recipe): Ingredient[] => {
  // TODO extract all the ingredients and format them intp
  const ingredients: Ingredient[] = [];
  for (let i = 0; i < 20; i++) {
    // dynamic key for accesing inredients
    const titleKey = `strIngredient${i}`;
    const amountKey = `strMeasure${i}`;

    const title = recipe[titleKey as keyof Recipe];
    const amount = recipe[amountKey as keyof Recipe];

    if (title && amount) {
      ingredients.push({
        title,
        amount,
      });
    }
  }
  return ingredients;
};
