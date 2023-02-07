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
import useLocalStorage from "../hooks/useLocalStorage";
import IngredientForm from "../features/Recipes/components/IngredientForm";

interface ShoppingListItem {
  ingredient: string;
  category: string;
  amount: string;
}

const categories = [
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

const ShoppingList = () => {
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [shoppingList, setShoppingList] = useLocalStorage<ShoppingListItem[]>("INTH20_SHOPPING_LIST", []);

  const handleAddToShoppingList = () => {
    setShoppingList([...shoppingList, { ingredient, category, amount }]);
    setIngredient("");
    setCategory("");
    setAmount("");
  };

  const handleRemoveFromShoppingList = (index: number) => {
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const sortedShoppingList = shoppingList
    .sort((a, b) => (a.category > b.category ? 1 : -1))
    .reduce((acc, item) => {
      const category = acc.find((c) => c.category === item.category);
      if (category) {
        category.ingredients.push(item);
      } else {
        acc.push({ category: item.category, ingredients: [item] });
      }
      return acc;
    }, [] as { category: string; ingredients: { ingredient: string; amount: string }[] }[]);

  return (
    <Grid
      container
      p={{ xs: "36px 36px", md: "48px 96px" }}
      direction="column">
      <Grid
        item
        xs={12}
        md={6}>
        <Typography
          variant="h1"
          mb="48px">
          Shopping List
        </Typography>
        <IngredientForm
          buttonLabel="Add to Shopping List"
          amount={amount}
          setAmount={setAmount}
          title={ingredient}
          setTitle={setIngredient}
          category={category}
          setCategory={setCategory}
          submitHandler={handleAddToShoppingList}
        />
        {sortedShoppingList.length === 0 ? (
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
              Your Shopping List is empty
            </Typography>
            <Typography variant="caption">
              Start your Shopping List by adding ingredients using the search bar above
            </Typography>
          </Grid>
        ) : (
          <Grid item>
            {sortedShoppingList.map((category, i) => (
              <List key={category.category}>
                <Typography
                  variant="h2"
                  mb="16px">
                  {category.category}
                  <span style={{ color: "#28D681", paddingLeft: "8px" }}>({category.ingredients.length})</span>
                </Typography>
                {category.ingredients.map((item, i) => (
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
                      <Checkbox color="success" />
                      <Typography
                        sx={{
                          fontSize: "24px",
                          fontWeight: "500",
                        }}>
                        {item.ingredient}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "20px",
                          color: "#9E9EB0",
                        }}>
                        {item.amount}
                      </Typography>
                      <Button
                        variant="text"
                        onClick={() => handleRemoveFromShoppingList(i)}
                        sx={{ color: "black" }}>
                        <ClearIcon sx={{ fontSize: "20px" }} />
                      </Button>
                    </Grid>
                  </ListItem>
                ))}
              </List>
            ))}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ShoppingList;
