import { FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  IconButton,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../Auth/context/auth-context";
import removeRecipe from "../api/recipes/removeRecipe";
import saveRecipe from "../api/recipes/saveRecipe";
import { useRecipeContext } from "../context/recipe-context";
import { Recipe, RecipeToSave } from "../interface";
import { assessComplexity, formatIngredients } from "../utils";
import CloseIcon from "@mui/icons-material/Close";
// import {  } from "@react-oauth/google";
import jwtDecode from "jwt-decode";
import { savedRecipes as getSavedRecipes } from "../api";

interface DishCardProps {
  data: Recipe;
}

export default function DishCard({ data }: DishCardProps) {
  const { savedRecipes, setSavedRecipes } = useRecipeContext();
  const { setIdToken, setProfile } = useAuthContext();
  const [isLiked, setIsLiked] = useState(() => {
    return savedRecipes.some((recipe) => recipe.id === data.idMeal);
  });

  const formattedIngredients = formatIngredients(data);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setShowModal((prevState) => !prevState);
  };

  // check if liked
  // useEffect(() => {
  //   if (savedRecipes.length === 0) setIsLiked(false);

  //   setIsLiked(savedRecipes.some((recipe) => recipe.title === data.strMeal));
  // }, [data.strMeal, savedRecipes]);

  const { idToken } = useAuthContext();

  // fetch all saved recipes and check if it is saved
  // useEffect(() => {
  //   if (idToken == null) setIsLiked(false);

  //   // TODO handle not logged case
  //   getSavedRecipes(idToken as string).then((recipes) => {
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
    if (isLiked) {
      removeRecipe(data.idMeal as string, idToken as string).then((response) => {});
    } else {
      const ingredients = formatIngredients(data);

      const recipe: RecipeToSave = {
        id: data.idMeal,
        title: data.strMeal,
        category: data.strCategory,
        ingredients,
        instructions: "",
        pic: data.strMealThumb,
        youtube_url: data.strYoutube,
      };

      saveRecipe(recipe, idToken as string);

      setSavedRecipes((recipes) => [...recipes, recipe]);
    }
  };

  const action = (
    <React.Fragment>
      {/* <Button
        variant="outlined"
        color="primary"
        size="small"
        onClick={login}>
        Sign In
      </Button> */}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={toggleModal}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <Link
        // TODO meaningful dishcards
        to={`/recipe?id=${data.idMeal}`}
        // to={`/`}
        style={{ textDecoration: "none" }}
        onClick={() => window.scrollTo({ top: 0 })}>
        <Card
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
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
                data.strMealThumb ||
                "https://www.yanaya.co.zw/wp-content/uploads/2020/08/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.jpg"
              }
            />
            <CardContent>
              <Stack
                direction="column"
                gap={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center">
                  <Typography
                    flexBasis="70%"
                    variant="body1"
                    fontWeight="bold">
                    {data.strMeal}
                  </Typography>
                  <div onClick={idToken ? clickHandler : toggleModal}>
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
                  <Typography variant="body1">{formattedIngredients.length} ingredients</Typography>
                  <Typography variant="body1">{assessComplexity(formattedIngredients)}</Typography>
                </Box>
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      {/* Modal to prompt user to sign in */}
      <Snackbar
        open={showModal}
        autoHideDuration={6000}
        onClose={toggleModal}
        message="You have to sign in"
        action={action}
      />
    </>
  );
}
