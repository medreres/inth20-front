import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import { AddShoppingCart, FavoriteBorder, FavoriteRounded } from "@mui/icons-material";
import axios from "axios";
import { Recipe } from "../features/Recipes/interface";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";
import { useSearchParams } from "react-router-dom";
import { formatIngredients } from "../features/Recipes/utils";

// interface Meal {
//   idMeal: string;
//   strMeal: string;
//   strMealThumb: string;
//   strInstructions: string;
//   strIngredient1: string;
//   strIngredient2: string;
//   strIngredient3: string;
//   strIngredient4: string;
//   strIngredient5: string;
//   strIngredient6: string;
//   strIngredient7: string;
//   strIngredient8: string;
//   strIngredient9: string;
//   strIngredient10: string;
//   strIngredient11: string;
//   strIngredient12: string;
//   strIngredient13: string;
//   strIngredient14: string;
//   strIngredient15: string;
// }

// interface Props {
//   id: string;
//   list: string[];
//   setList: (list: string[]) => void;
//   // recipe: Recipe;
// }

const RecipePage = () => {
  //Liked
  const { savedRecipes } = useRecipeContext();
  const [isLiked, setIsLiked] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${searchParams.get("id")}`).then(({ data }) => {
      setRecipe(data.meals[0]);
    });
  }, [searchParams]);

  // check if liked
  useEffect(() => {
    if (recipe == null) return;
    if (savedRecipes.length === 0) setIsLiked(false);

    setIsLiked(savedRecipes.some((recipe) => recipe.title === recipe.title));
  }, [recipe, savedRecipes]);

  const toggleLiked = () => setIsLiked((prevState) => !prevState);
  const clickHandler = (e: any) => {
    e.stopPropagation();
    toggleLiked();
  };

  // const [recipe, setRecipe] = useState('');

  // fetch recipe from db
  // useEffect(() => {
  //   axios.get('www.themealdb.com/api/json/v1/1/lookup.php?i='+)
  // }, [])

  //Check
  const [added, setAdded] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = added.indexOf(value);
    const newAdded = [...added];

    if (currentIndex === -1) {
      newAdded.push(value);
    } else {
      newAdded.splice(currentIndex, 1);
    }

    setAdded(newAdded);
  };

  return (
    <div>
      <Grid
        container
        padding={{ xs: "10px 24px", md: "14px 96px" }}>
        <Grid
          item
          xs={12}
          sx={{
            color: "black",
            fontWeight: "700",
            fontSize: { xs: "18px", md: "24px" },
            lineHeight: "33px",
            display: "flex",
            alignItems: "center",
            mt: "24px",
          }}>
          <ArrowBackIcon
            sx={{
              mr: "40px",
            }}
          />
          <Link
            href="/browse-recipes"
            color="inherit"
            underline="none">
            Browse Recipes
          </Link>
        </Grid>
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
              alt="meal image"
              style={{
                borderRadius: "16px",
                padding: "0 10px",
                objectFit: "contain",
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
              <Typography variant="h3">{recipe?.strMeal}</Typography>
              <div onClick={clickHandler}>
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
              <Typography variant="body1">30 min</Typography>
              <Typography variant="body1">7 ingredients</Typography>
              <Typography variant="body1">Easy</Typography>
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
                }}>
                {formatIngredients(recipe ?? undefined).map(({ amount, title }, index) => {
                  const labelId = `checkbox-list-label-${title}`;
                  return (
                    <ListItem
                      key={title}
                      disablePadding>
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
                  );
                })}
              </List>
            </Box>
          </Grid>
        </Grid>
        <Box maxWidth={{ xs: "100%", md: "60%" }}>
          <Typography
            variant="h4"
            pb="24px">
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
      </Grid>
    </div>
  );
};

export default RecipePage;
