import { FavoriteRounded, FavoriteBorder } from "@mui/icons-material";
import {
  Grid,
  Box,
  Typography,
  Button,
  List,
  FormControlLabel,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import axios from "axios";
import Image from "mui-image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../Auth/context/auth-context";
import { removeRecipe, saveRecipe } from "../api";
import { useRecipeContext } from "../context/recipe-context";
import { Recipe, RecipeToSave } from "../interface";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { assessComplexity, formatIngredients } from "../utils";
import SignInPopup from "./SignInPopup";
interface DishInfoProps {
  setIsLoading: (setIsLoading: boolean) => void;
  isLoading: boolean;
}
export default function DishInfo({ setIsLoading, isLoading }: DishInfoProps) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [searchParams] = useSearchParams();
  const formattedIngredients = formatIngredients(recipe);
  const { idToken } = useAuthContext();
  const [isLiked, setIsLiked] = useState(false);
  const toggleLiked = () => setIsLiked((prevState) => !prevState);
  const { savedRecipes } = useRecipeContext();
  const [showPopup, setShowPopup] = useState(false);
  const togglePopup = () => setShowPopup((prevState) => !prevState);

  // get recipe data
  useEffect(() => {
    axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${searchParams.get("id")}`).then(({ data }) => {
      setRecipe(data.meals[0]);
      setIsLoading(false);
    });
  }, [searchParams, setIsLoading]);

  const clickHandler = (e: any) => {
    if (!recipe) return;
    // prevent event bubbling
    e.stopPropagation();

    // tailor object for backend

    // toggle state
    toggleLiked();

    // send request to database
    if (isLiked) {
      removeRecipe(recipe.idMeal as string, idToken as string).then((response) => {
        console.log("removed");
      });
    } else {
      const ingredients = formatIngredients(recipe);

      const recipeToSave: RecipeToSave = {
        id: recipe.idMeal,
        title: recipe.strMeal,
        category: recipe.strCategory,
        ingredients,
        instructions: "",
        pic: recipe.strMealThumb,
        youtube_url: recipe.strYoutube,
      };

      saveRecipe(recipeToSave, idToken as string);
    }
  };

  // check if liked
  useEffect(() => {
    if (recipe == null) return;
    if (savedRecipes.length === 0) setIsLiked(false);

    setIsLiked(savedRecipes.some((recipeListed) => recipe.strMeal === recipeListed.title));
  }, [recipe, savedRecipes]);
  return (
    <>
      {isLoading && (
        <CircularProgress
          size="10em"
          sx={{
            my: "30vh",
          }}
          style={{
            color: "#26D681",
          }}
        />
      )}
      {!isLoading && (
        <>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            mt="48px"
            columnSpacing="64px">
            <Grid
              item
              xs={12}
              md={6}
              mb={{ xs: "48px", md: "0" }}>
              <Image
                src={
                  recipe?.strMealThumb ??
                  "https://www.yanaya.co.zw/wp-content/uploads/2020/08/79-798754_hoteles-y-centros-vacacionales-dish-placeholder-hd-png.jpg"
                }
                alt="meal"
                style={{
                  borderRadius: "16px",
                  // padding: "0 10px",
                  // objectFit: "contain",
                  maxHeight: "60vh",
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                pb="24px">
                <Typography
                  variant="h1"
                  fontWeight="700">
                  {recipe?.strMeal}
                </Typography>
                <div onClick={idToken ? clickHandler : togglePopup}>
                  {isLiked ? (
                    <FavoriteRounded
                      sx={{
                        color: "#28D681",
                        fontSize: "32px",
                      }}
                    />
                  ) : (
                    <FavoriteBorder
                      sx={{
                        fontSize: "32px",
                      }}
                    />
                  )}
                </div>
              </Box>
              <Box
                display="flex"
                justifyContent={{ xs: "space-between", md: "flex-start" }}
                gap={{ md: "64px" }}
                pb="24px">
                {/* <Typography variant="body1">30 min</Typography> */}
                <Typography variant="caption">{formattedIngredients.length} ingredients</Typography>
                <Typography variant="caption">{assessComplexity(formattedIngredients)}</Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column">
                <Typography
                  variant="h4"
                  pb="24px">
                  Ingredients
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    pb: "24px",
                    fontWeight: "700",
                    fontSize: "24px",
                  }}>
                  <Button>
                    <AddShoppingCartIcon
                      sx={{
                        color: "black",
                        mr: "20px",
                      }}
                    />
                    <Typography>Add All to Shopping List</Typography>
                  </Button>
                </Box>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    py: "0",
                  }}>
                  {formatIngredients(recipe ?? null)
                    // TODO fix
                    .slice(0, 5)
                    .map(({ amount, title }, index) => {
                      const labelId = `checkbox-list-label-${title}`;
                      return (
                        <FormControlLabel
                          key={title + amount}
                          control={
                            <ListItem disablePadding>
                              <ListItemButton
                                role={undefined}
                                // onClick={handleToggle(value)}
                                dense>
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    // checked={added.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    color="success"
                                    inputProps={{ "aria-labelledby": title }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  id={labelId}
                                  primary={`${title}  ${amount}`}
                                />
                              </ListItemButton>
                            </ListItem>
                          }
                          label=""
                        />
                      );
                    })}
                </List>
              </Box>
            </Grid>
          </Grid>
          <Box maxWidth={{ xs: "100%", md: "60%" }}>
            <Typography
              variant="h4"
              my="24px">
              Directions
            </Typography>
            <Typography pb={{ xs: "48px", md: "96px" }}>{recipe?.strInstructions ?? "loading"}</Typography>
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "32px",
                lineHeight: "44px",
                color: "#28D681",
                mb: "96px",
              }}>
              Bon appetit!
            </Typography>
          </Box>
          <SignInPopup
            show={showPopup}
            onClose={togglePopup}
          />
        </>
      )}
    </>
  );
}
