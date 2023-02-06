import React, { useEffect, useState } from 'react';
import { TextField, Select, FormControl, InputLabel, MenuItem, Button, Grid, Typography, Autocomplete, InputAdornment, List, ListItem, Checkbox } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import ClearIcon from '@mui/icons-material/Clear';

interface MyFridgeItem {
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

const MyFridge = () => {
  const [ingredient, setIngredient] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  // const [shoppingList, setShoppingList] = useState<MyFridgeItem[]>([]);
  const [myFridge, setMyFridge] = useState<MyFridgeItem[]>([]);

  const handleAddToMyFridge = () => {
    setMyFridge([...myFridge, { ingredient, category, amount }]);
    setIngredient('');
    setCategory('');
    setAmount('');
  };

  const handleRemoveFromMyFridge = (index: number) => {
    setMyFridge(myFridge.filter((_, i) => i !== index));
  };
  
  // const handleMoveToShoppingList = (index: number) => {
  //   const [ingredient] = myFridge.splice(index, 1);
  //   setMyFridge([...myFridge]);
  //   setShoppingList([...shoppingList, ingredient]);
  // };

  const sortedMyFridge = myFridge
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
    const myFridgeFromLocalStorage = localStorage.getItem("myFridge");

    if (myFridgeFromLocalStorage) {
      setMyFridge(JSON.parse(myFridgeFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myFridge", JSON.stringify(myFridge));
  }, [myFridge]);

  return (
    <Grid container p="48px 96px" direction="column">
      <Grid item xs={12}>
      <Typography variant="h1" mb="48px">
        My Fridge 
        </Typography>
        <Grid item md={6} mb="16px">
        <TextField label="Enter ingredient" variant="outlined" value={ingredient} onChange={e => setIngredient(e.target.value)} fullWidth InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }} />
        </Grid>
        <Grid item md={6} mb="16px" >
          <FormControl fullWidth>
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
      <Grid item xs={4} mb="16px">
        <TextField label="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} fullWidth  />
      </Grid>
      <Grid item alignItems="center"  xs={8} md={4} mb="48px">
        <Button variant="contained" color="primary" fullWidth onClick={handleAddToMyFridge} sx={{
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: "700",
          textTransform: "capitalize",
          border: "none"
        }} >
          <AddBoxOutlinedIcon sx={{ fontSize: "30px", mr: "20px" }} />
          Add to Fridge
        </Button>
      </Grid>
        {sortedMyFridge.length === 0 ? (
          <Grid item xs={12} justifyContent="center" textAlign="center" alignItems="center" mt="120px" mb="180px">
          <Typography variant="h2" mb="16px">
            Your Fridge is empty
          </Typography>
          <Typography variant="caption" >
            Fill your Fridge by adding ingredients using the search bar above
          </Typography>
        </Grid>
        ) : (
        <Grid item>
          {sortedMyFridge.map((category, i) => (
          <List>
            <Typography variant="h2" mb="16px">
              {category.category} 
              <span style={{color: "#28D681", paddingLeft: "8px"}}>
                ({category.ingredients.length})
              </span>
            </Typography>
            {category.ingredients.map((item, i) => (
            <ListItem key={i}>
                {item.ingredient} {item.amount}
              <Button onClick={() => handleRemoveFromMyFridge(i)}>
                Remove
              </Button>
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

export default MyFridge;
