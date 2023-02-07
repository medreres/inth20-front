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
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import Creatable, { useCreatable } from "react-select/creatable";
import data from "../features/Recipes/data/ingredients.json";
import { Box } from "@mui/system";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";
import { addIngredient, deleteIngredient, IngredientToSave } from "../features/Recipes/api";
import { useAuthContext } from "../features/Auth/context/auth-context";
import SignIn from "../components/SignIn";

interface MyFridgeItem {
  ingredient: string;
  category: string;
  amount: string;
}

const ingredienCategories = [
  "Fruits & Vegetables",
  "Bakery and Bread",
  "Meat and Seafood",
  "Dairy, Cheese, and Eggs",
  "Pasta and Grains",
  "Drinks",
  "Frozen and Canned Foods",
  "Snacks",
  "Oils, Sauces and Condiments",
];

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
        <Grid
          item
          md={6}
          mb="16px">
          <TextField
            label="Enter ingredient"
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            color="secondary"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* <Autocomplete
            id="ingredients"
            color="secondary"
            freeSolo
            options={data.ingredients.map((option) => option)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Enter ingredient"
              />
            )}
          /> */}
        </Grid>
        <Grid
          item
          md={6}
          mb="16px">
          <FormControl
            color="secondary"
            fullWidth>
            <InputLabel id="category-select-label">Choose a category</InputLabel>
            <Select
              labelId="category-select-label"
              label="Choose a category"
              value={category}
              onChange={(e) => setCategory(e.target.value as string)}>
              {ingredienCategories.map((category) => (
                <MenuItem
                  key={category}
                  value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={6}
          sm={4}
          mb="16px">
          <TextField
            label="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            color="secondary"
            fullWidth
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={8}
          md={4}
          mb={{ xs: "24px", sm: "48px" }}>
          <Button
            variant="text"
            fullWidth
            onClick={handleAddToMyFridge}
            sx={{
              fontSize: "24px",
              lineHeight: "32px",
              fontWeight: "700",
              textTransform: "none",
              border: "none",
              py: "10px",
              color: "black",
            }}>
            <AddBoxOutlinedIcon sx={{ fontSize: "30px", mr: "20px" }} />
            Add to Fridge
          </Button>
        </Grid>
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
