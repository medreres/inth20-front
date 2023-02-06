import React, { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../../Auth/context/auth-context";
import { RecipeToSave } from "../interface";
import getSavedRecipes from "../api/savedRecipes";

const RecipeContext = React.createContext<RecipeContextValue | null>(null);

interface RecipeContextValue {
  savedRecipes: RecipeToSave[];
  setSavedRecipes: React.Dispatch<React.SetStateAction<RecipeToSave[]>>;
}

export const useRecipeContext = () => useContext(RecipeContext) as RecipeContextValue;

const RecipeContextProvider = ({ children }: any) => {
  const { idToken } = useAuthContext();
  const [savedRecipes, setSavedRecipes] = useState<RecipeToSave[]>([]);

  useEffect(() => {
    if (idToken == null) return setSavedRecipes([]);

    getSavedRecipes(idToken as string).then((recipes) => setSavedRecipes(recipes));
  }, [idToken]);

  return (
    <RecipeContext.Provider
      value={{
        savedRecipes,
        setSavedRecipes
      }}>
      {children}
    </RecipeContext.Provider>
  );
};
export default RecipeContextProvider;
