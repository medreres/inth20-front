import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Button,
  Grid,
  Typography,
  Autocomplete,
  InputAdornment,
  List,
  ListItem,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import ClearIcon from "@mui/icons-material/Clear";
import Creatable, { useCreatable } from "react-select/creatable";
import data from "../features/Recipes/data/ingredients.json";
import { Box } from "@mui/system";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";
import { addIngredient, deleteIngredient, IngredientToSave } from "../features/Recipes/api";
import { useAuthContext } from "../features/Auth/context/auth-context";
import SignIn from "../components/SignIn";
import IngredientForm from "../features/Recipes/components/IngredientForm";

interface MyFridgeItem {
  ingredient: string;
  category: string;
  amount: string;
}

const MyFridge = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const { ingredients, categories, setIngredients, isLoading } = useRecipeContext();
  const { idToken } = useAuthContext();

  // const [shoppingList, setShoppingList] = useState<MyFridgeItem[]>([]);
  // const [myFridge, setMyFridge] = useState<MyFridgeItem[]>([]);

  // TODO form checking
  // TODO handle null TOKEN
  const handleAddToMyFridge = () => {
    // setMyFridge([...myFridge, { ingredient, category, amount }]);
    setTitle("");
    setCategory("");
    setAmount("");

    addIngredient(
      {
        id: undefined,
        amount,
        category: {
          id: undefined,
          title: category,
        },
        title,
      },
      idToken as string
    ).then((response) => {
      setIngredients((prevState) => [...prevState, response as IngredientToSave]);
    });
  };

  const removeIngredient = (id: string) => {
    deleteIngredient(id, idToken as string).then((response) => {
      console.log(response);
    });
    setIngredients((ingredients) => ingredients.filter((ingredient) => ingredient.id !== id));
  };

  if (!idToken) return <SignIn />;

  return (
    <Grid
      container
      p={{ xs: "36px 36px", md: "48px 96px" }}
      direction="column">
      <Grid
        item
        xs={12}>
        <Typography
          variant="h1"
          mb="48px">
          My Fridge
        </Typography>
        <IngredientForm
          title={title}
          setTitle={setTitle}
          category={category}
          setCategory={setCategory}
          amount={amount}
          setAmount={setAmount}
          submitHandler={handleAddToMyFridge}
          buttonLabel="Add to Fridge"
        />
        {isLoading && (
          <Grid
            item
            xs={12}
            justifyContent="center"
            textAlign="center"
            alignItems="center"
            // mt="120px"
            // mb="180px"
          >
            <CircularProgress
              size="10em"
              style={{
                color: "#26D681",
              }}
            />
          </Grid>
        )}
        {!isLoading && (
          <>
            {ingredients.length === 0 ? (
              <Grid
                item
                xs={12}
                justifyContent="center"
                textAlign="center"
                alignItems="center"
                mt="120px"
                mb="180px">
                <Typography
                  variant="h2"
                  mb="16px">
                  Your Fridge is empty
                </Typography>
                <Typography variant="caption">
                  Fill your Fridge by adding ingredients using the search bar above
                </Typography>
              </Grid>
            ) : (
              <Grid item>
                {categories.map((category) => (
                  <Box
                    key={category}
                    pb={{ xs: "24px", md: "48px" }}>
                    <List>
                      <Typography
                        variant="h2"
                        mb="16px">
                        {category}
                        {/* <span style={{ color: "#28D681", paddingLeft: "8px" }}>({category.ingredients.length})</span> */}
                      </Typography>
                      {ingredients
                        .filter((ingredient) => ingredient.category.title === category)
                        .map((ingredient, i) => (
                          <ListItem key={ingredient.title}>
                            <Grid
                              item
                              xs={12}
                              sm={6}
                              display="flex"
                              flexDirection="row"
                              justifyContent="space-between"
                              alignItems="center"
                              pl={{ xs: "0", sm: "32px" }}>
                              <Typography
                                sx={{
                                  fontSize: "24px",
                                  fontWeight: "500",
                                }}>
                                {ingredient.title}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "20px",
                                  color: "#9E9EB0",
                                }}>
                                {ingredient.amount}
                              </Typography>
                              <Button
                                // variant="text"
                                onClick={() => removeIngredient(ingredient.id as string)}
                                sx={{ color: "black" }}>
                                <ClearIcon sx={{ fontSize: "20px" }} />
                              </Button>
                            </Grid>
                          </ListItem>
                        ))}
                    </List>
                  </Box>
                ))}
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default MyFridge;
