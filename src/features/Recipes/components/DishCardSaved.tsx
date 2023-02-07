import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../Auth/context/auth-context";
import removeRecipe from "../api/recipes/removeRecipe";
import savedRecipes from "../api/recipes/savedRecipes";
import saveRecipe from "../api/recipes/saveRecipe";
import { useRecipeContext } from "../context/recipe-context";
import { Recipe, RecipeToSave } from "../interface";
import { assessComplexity, formatIngredients } from "../utils";

interface DishCardProps {
  data: RecipeToSave;
}
export default function DishCardSaved({ data }: DishCardProps) {
  const { savedRecipes, setSavedRecipes } = useRecipeContext();
  const [isLiked, setIsLiked] = useState(true);

  //   const formattedIngredients = formatIngredients(data);

  // check if liked
  //   useEffect(() => {
  //     if (savedRecipes.length === 0) setIsLiked(false);

  //     setIsLiked(savedRecipes.some((recipe) => recipe.title === data.strMeal));
  //   }, [data.strMeal, savedRecipes]);

  const { idToken } = useAuthContext();

  // fetch all saved recipes and check if it is saved
  // useEffect(() => {
  //   if (idToken == null) setIsLiked(false);

  //   // TODO handle not logged case
  //   savedRecipes(idToken as string).then((recipes) => {
  //     const isSaved = recipes.some((recipe) => recipe.title === data.strMeal);
  //     setIsLiked(isSaved);
  //   });
  // }, [data.strMeal, idToken]);

  const toggleLiked = () => setIsLiked((prevState) => !prevState);
  const clickHandler = (e: any) => {
    // prevent event bubbling
    e.preventDefault();
    e.stopPropagation();
    // tailor object for backend

    // toggle state
    toggleLiked();

    // send request to database

    removeRecipe(data.id as string, idToken as string).then((response) => {});
    setSavedRecipes((recipes) => recipes.filter((recipes) => recipes.id !== data.id));
  };

  return (
    <Link
      // TODO meaningful dishcards
      to={`/recipe?id=${data.id}`}
      style={{ textDecoration: "none" }}
      onClick={(e) => window.scrollTo({ top: 0 })}>
      <Card>
        <CardActionArea>
          <CardMedia
            loading="lazy"
            component="img"
            height="200"
            width="200"
            style={{
              borderRadius: "10px",
            }}
            image={
              data.pic ||
              "https://www.yanaya.co.zw/wp-content/uploads/2020/08/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.jpg"
            }
          />
          <CardContent>
            <Stack
              direction="column"
              gap={2}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center">
                <Typography
                  flexBasis="70%"
                  variant="body1"
                  fontWeight="bold">
                  {data.title}
                </Typography>
                <div onClick={clickHandler}>
                  {isLiked ? (
                    <FavoriteRounded
                      sx={{
                        color: "#28D681",
                      }}
                    />
                  ) : (
                    <FavoriteBorder />
                  )}
                </div>
              </Box>
              <Box
                display="flex"
                justifyContent="space-between"
                pt={1}>
                {/* <Typography variant="body1">30 min</Typography> */}
                <Typography variant="body1">{data.ingredients.length} ingredients</Typography>
                <Typography variant="body1">{assessComplexity(data.ingredients)}</Typography>
              </Box>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
