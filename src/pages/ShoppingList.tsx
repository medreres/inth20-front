import React, { useEffect, useState } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem, Button, Grid, Typography, Autocomplete, InputAdornment, List, ListItem, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ClearIcon from '@mui/icons-material/Clear';

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
  "Oils, Sauces and Condiments"
];

const ShoppingList = () => {
  const [ingredient, setIngredient] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  // const [myFridge, setMyFridge] = useState<ShoppingListItem[]>([]);

  const handleAddToShoppingList = () => {
    setShoppingList([...shoppingList, { ingredient, category, amount }]);
    setIngredient('');
    setCategory('');
    setAmount('');
  };

  const handleRemoveFromShoppingList = (index: number) => {
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  // const handleMoveToMyFridge = (index: number) => {
  //   setMyFridge([...myFridge, shoppingList[index]]);
  //   setShoppingList(shoppingList.filter((_, i) => i !== index));
  // };

  const sortedShoppingList = shoppingList
    .sort((a, b) => (a.category > b.category ? 1 : -1))
    .reduce((acc, item) => {
      const category = acc.find(
        (c) => c.category === item.category
      );
      if (category) {
        category.ingredients.push(item);
      } else {
        acc.push({ category: item.category, ingredients: [item] });
      }
      return acc;
    }, [] as { category: string; ingredients: { ingredient: string; amount: string; }[] }[]);

  useEffect(() => {
    const shoppingListFromLocalStorage = localStorage.getItem("shoppingList");

    if (shoppingListFromLocalStorage) {
      setShoppingList(JSON.parse(shoppingListFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  return (
      <Grid container p={{xs:"36px 36px", md:"48px 96px"}} direction="column">
      <Grid item xs={12} md={6} >
        <Typography variant="h1" mb="48px">
          Shopping List
        </Typography>
        <Grid item md={6} mb="16px">
        <TextField label="Enter ingredient" value={ingredient} onChange={e => setIngredient(e.target.value)} fullWidth variant="outlined" color="secondary" InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
        </Grid>
        <Grid item md={6} mb="16px" >
          <FormControl color="secondary" fullWidth>
            <InputLabel id="category-select-label">Choose a category</InputLabel>
            <Select
              labelId="category-select-label"
              value={category}
              onChange={e => setCategory(e.target.value as string)}
            >
            {categories.map(category => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6} sm={4} mb="16px">
        <TextField label="Enter amount" color="secondary" value={amount} onChange={e => setAmount(e.target.value)} fullWidth  />
      </Grid>
      <Grid item alignItems="center"xs={8} md={4} mb="48px">
        <Button variant="text" color="secondary" fullWidth onClick={handleAddToShoppingList} sx={{
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: "700",
          textTransform: "none",
          border: "none"
        }} >
          <AddBoxOutlinedIcon sx={{ fontSize: "30px", mr: "20px" }} />
          Add to Shopping List
        </Button>
      </Grid>
      {sortedShoppingList.length === 0 ? (
        <Grid item xs={12} justifyContent="center" textAlign="center" alignItems="center" mt="120px" mb="180px">
          <Typography variant="h2" mb="16px">
            Your Shopping List is empty
          </Typography>
          <Typography variant="caption" >
            Start your Shopping List by adding ingredients using the search bar above
          </Typography>
        </Grid>
      ) : (
      <Grid item>
        {sortedShoppingList.map((category, i) => (
          <List>
            <Typography variant="h2" mb="16px">
              {category.category} 
              <span style={{color: "#28D681", paddingLeft: "8px"}}>
                ({category.ingredients.length})
              </span>
            </Typography>
            {category.ingredients.map((item, i) => (
            <ListItem key={i}>
              <Grid item xs={12} sm={6} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" pl={{xs:"0", sm:"32px"}}>
                <Checkbox color="success" />
                <Typography 
                  sx={{
                    fontSize: "24px",
                    fontWeight: "500",
                  }}
                >
                  {item.ingredient}
                </Typography>
                <Typography
                sx={{
                  fontSize: "20px",
                  color: "#9E9EB0"
                }}
                >
                  {item.amount}
                </Typography>
                <Button variant="text" onClick={() => handleRemoveFromShoppingList(i)} sx={{color: "black"}}>
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
  )  
}

export default ShoppingList;
