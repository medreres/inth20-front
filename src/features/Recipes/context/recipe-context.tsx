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
  isLoading: boolean;
}

export const useRecipeContext = () => useContext(RecipeContext) as RecipeContextValue;

const RecipeContextProvider = ({ children }: any) => {
  const { idToken } = useAuthContext();

  const [savedRecipes, setSavedRecipes] = useState<RecipeToSave[]>([]);
  const [savedRecipesDonwloaded, setSavedRecipesDonwloaded] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<IngredientToSave[]>([]);
  const [ingredientsDonwloaded, setIngredientsDonwloaded] = useState(false);

  const [isLoading, setIsLoading] = useState(true);

  // get saved recipes
  useEffect(() => {
    if (idToken == null) return;

    getSavedRecipes(idToken as string).then((recipes) => {
      setSavedRecipes(recipes);
      setSavedRecipesDonwloaded(true);
    });
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
      setIngredientsDonwloaded(true);
    });
  }, [idToken]);

  // loading state
  useEffect(() => {
    // console.log('savedRecipesDonwloaded', savedRecipesDonwloaded)
    // console.log('ingredientsDonwloaded', ingredientsDonwloaded)
    setIsLoading(!(savedRecipesDonwloaded && ingredientsDonwloaded));
  }, [ingredientsDonwloaded, isLoading, savedRecipesDonwloaded]);

  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes,
        ingredients,
        setIngredients,
        categories,
        setCategories,
        isLoading,
      }}>
      {children}
    </RecipeContext.Provider>
  );
};
export default RecipeContextProvider;
