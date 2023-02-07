import React, { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import { Category, RecipeToSave } from "../interface";
import getSavedRecipes from "../api/recipes/savedRecipes";
import { IngredientToSave, savedCategories, savedIngredients } from "../api";

const RecipeContext = React.createContext<RecipeContextValue | null>(null);

interface RecipeContextValue {
  savedRecipes: RecipeToSave[];
  setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeToSave[]>>;
  ingredients: IngredientToSave[];
  setIngredients: React.Dispatch<React.SetStateAction<IngredientToSave[]>>;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

export const useRecipeContext = () => useContext(RecipeContext) as RecipeContextValue;

const RecipeContextProvider = ({ children }: any) => {
  const { idToken } = useAuthContext();
  const [savedRecipes, setSavedRecipes] = useState<RecipeToSave[]>([]);
  const [ingredients, setIngredients] = useState<IngredientToSave[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  // get saved recipes
  useEffect(() => {
    if (idToken == null) return;

    getSavedRecipes(idToken as string).then((recipes) => setSavedRecipes(recipes));
  }, [idToken]);

  // get all categories
  useEffect(() => {
    if (idToken == null || ingredients.length === 0) return;

    const categories: string[] = [];
    ingredients.forEach((ingredient) => {
      if (!categories.includes(ingredient.category.title)) categories.push(ingredient.category.title);
    });

    setCategories(categories);
    // savedCategories(idToken).then((categories) => {
    //   setCategories(categories);
    // });
  }, [idToken, ingredients, ingredients.length]);

  // get all ingredients
  useEffect(() => {
    if (idToken == null) return;

    savedIngredients(idToken).then((ingredients) => {
      setIngredients(ingredients);
    });
  }, [idToken]);

  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes,
        ingredients,
        setIngredients,
        categories,
        setCategories,
      }}>
      {children}
    </RecipeContext.Provider>
  );
};
export default RecipeContextProvider;
