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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import Creatable, { useCreatable } from "react-select/creatable";
import data from "../features/Recipes/data/ingredients.json";
import { Box } from "@mui/system";
import { useRecipeContext } from "../features/Recipes/context/recipe-context";
import { addIngredient } from "../features/Recipes/api";
import { useAuthContext } from "../features/Auth/context/auth-context";

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

  const { ingredients, categories } = useRecipeContext();
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
        amount,
        category: {
          id: "",
          title: category,
        },
        title,
      },
      idToken as string
    ).then((response) => {
      console.log(response);
    });
  };

  // const handleRemoveFromMyFridge = (index: number) => {
  //   setMyFridge(myFridge.filter((_, i) => i !== index));
  // };

  // const handleMoveToShoppingList = (index: number) => {
  //   const [ingredient] = myFridge.splice(index, 1);
  //   setMyFridge([...myFridge]);
  //   setShoppingList([...shoppingList, ingredient]);
  // };

  // const sortedMyFridge = myFridge
  //   .sort((a, b) => (a.category > b.category ? 1 : -1))
  //   .reduce((acc, item) => {
  //     const category = acc.find((c) => c.category === item.category);
  //     if (category) {
  //       category.ingredients.push(item);
  //     } else {
  //       acc.push({ category: item.category, ingredients: [item] });
  //     }
  //     return acc;
  //   }, [] as { category: string; ingredients: { ingredient: string; amount: string }[] }[]);

  // useEffect(() => {
  //   const myFridgeFromLocalStorage = localStorage.getItem("myFridge");

  //   if (myFridgeFromLocalStorage) {
  //     setMyFridge(JSON.parse(myFridgeFromLocalStorage));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("myFridge", JSON.stringify(myFridge));
  // }, [myFridge]);

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
            <Typography variant="caption">Fill your Fridge by adding ingredients using the search bar above</Typography>
          </Grid>
        ) : (
          <Grid item>
            {categories.map((category, i) => (
              <Box pb={{ xs: "24px", md: "48px" }}>
                <List>
                  <Typography
                    variant="h2"
                    mb="16px">
                    {category.title}
                    {/* <span style={{ color: "#28D681", paddingLeft: "8px" }}>({category.ingredients.length})</span> */}
                  </Typography>
                  {ingredients
                    .filter((ingredient) => ingredient.category.title === category.title)
                    .map((ingredient, i) => (
                      <ListItem key={i}>
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
                            variant="text"
                            // onClick={() => handleRemoveFromMyFridge(i)}
                            sx={{ color: "black" }}>
                            <ClearIcon sx={{ fontSize: "20px" }} />
                          </Button>
                        </Grid>
                      </ListItem>
                    ))}
                </List>
              </Box>
            ))}
            <Grid
              item
              xs={12}
              sm={6}
              md={4}>
              <Button
                href="/frige-based"
                fullWidth
                style={{
                  backgroundColor: "#28D681",
                  color: "#fff",
                  padding: "20px auto",
                  textTransform: "capitalize",
                  fontSize: "20px",
                  fontWeight: "700",
                  borderRadius: "8px",
                }}>
                Find Fridge-Based Recipes
              </Button>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default MyFridge;
