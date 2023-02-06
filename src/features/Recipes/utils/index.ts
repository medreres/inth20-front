import { format } from "path";
import { Recipe, Ingredient } from "./../interface/index";
export const formatIngredients = (recipe: Recipe | undefined): Ingredient[] => {
  if (!recipe) return [];
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

/**
 * filter by difficulty, count number of ingredients
 * easy < 7
 * medium 8-12
 * hard > 12
 */
export const filterByDifficulty = (recipes: Recipe[], difficulty: string) => {
  const DIFFICULTIES = {
    easy: (n: number) => n < 7,
    medium: (n: number) => n >= 7 && n <= 12,
    hard: (n: number) => n > 12,
  };
  return recipes.filter((recipe) =>
    DIFFICULTIES[difficulty as keyof typeof DIFFICULTIES](formatIngredients(recipe).length)
  );
};