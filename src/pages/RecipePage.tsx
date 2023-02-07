import React, { useEffect, useState } from "react";
import { Stack } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
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
import { Recipe, RecipeToSave } from "../features/Recipes/interface";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";
import { useSearchParams } from "react-router-dom";
import { assessComplexity, formatIngredients } from "../features/Recipes/utils";
import { removeRecipe, saveRecipe } from "../features/Recipes/api";
import { useAuthContext } from "../features/Auth/context/auth-context";
import SignInPopup from "../features/Recipes/components/SignInPopup";
import DishInfo from "../features/Recipes/components/DishInfo";

const RecipePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const loadingStyles = isLoading
    ? {
        justifyContent: "center",
        alignItems: "center",
      }
    : {};

  return (
    <>
      <Grid
        container
        padding={{ xs: "10px 24px", md: "14px 96px" }}
        {...loadingStyles}>
        <Grid
          item
          xs={12}
          sx={{
            color: "black",
            fontWeight: "700",
            fontSize: "24px",
            lineHeight: "33px",
            display: "flex",
            alignItems: "center",
            mt: "24px",
          }}>
          <Button
            color="inherit"
            onClick={() => window.history.back()}
            style={{ cursor: "pointer", fontWeight: "700", textTransform: "capitalize", padding: ".5em" }}>
            <ArrowBackIcon
              sx={{
                mr: { xs: "16px", md: "32px" },
              }}
            />
            Back
          </Button>
        </Grid>
        <DishInfo
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </Grid>
    </>
  );
};

export default RecipePage;
