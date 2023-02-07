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

const ShoppingListPage = () => {
  const [ingredient, setIngredient] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [myFridge, setMyFridge] = useState<ShoppingListItem[]>([]);

  const handleAddToShoppingList = () => {
    setShoppingList([...shoppingList, { ingredient, category, amount }]);
    setIngredient('');
    setCategory('');
    setAmount('');
  };

  const handleAddToMyFridge = () => {
    setMyFridge([...myFridge, { ingredient, category, amount }]);
    setIngredient('');
    setCategory('');
    setAmount('');
  };

  const handleRemoveFromShoppingList = (index: number) => {
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const handleRemoveFromMyFridge = (index: number) => {
    setMyFridge(myFridge.filter((_, i) => i !== index));
  };

  const handleMoveToMyFridge = (index: number) => {
    setMyFridge([...myFridge, shoppingList[index]]);
    setShoppingList(shoppingList.filter((_, i) => i !== index));
  };

  const handleMoveToShoppingList = (index: number) => {
    const [ingredient] = myFridge.splice(index, 1);
    setMyFridge([...myFridge]);
    setShoppingList([...shoppingList, ingredient]);
  };

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
    const shoppingListFromLocalStorage = localStorage.getItem("shoppingList");
    const myFridgeFromLocalStorage = localStorage.getItem("myFridge");

    if (shoppingListFromLocalStorage) {
      setShoppingList(JSON.parse(shoppingListFromLocalStorage));
    }
    if (myFridgeFromLocalStorage) {
      setMyFridge(JSON.parse(myFridgeFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
    localStorage.setItem("myFridge", JSON.stringify(myFridge));
  }, [shoppingList, myFridge]);

  return (
    <Grid container p="48px 96px" direction="column">
      {/* ShoppingList */}
      <Grid item xs={12} md={6} >
        <Typography variant="h1" mb="48px">
          Shopping List
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
      <Grid item xs={6} sm={4} mb="16px">
        <TextField label="Enter amount" value={amount} onChange={e => setAmount(e.target.value)} fullWidth  />
      </Grid>
      <Grid item alignItems="center"xs={8} md={4} mb="48px">
        <Button variant="contained" color="primary" fullWidth onClick={handleAddToShoppingList} sx={{
          fontSize: "24px",
          lineHeight: "32px",
          fontWeight: "700",
          textTransform: "capitalize",
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
              <Checkbox
                onChange={() => handleMoveToMyFridge(i)}
                inputProps={{ 'aria-label': 'controlled' }}
              />
                {item.ingredient} - {item.amount}
              <Button onClick={() => handleRemoveFromShoppingList(i)} variant="outlined">
                <ClearIcon />
                Remove
              </Button>
            </ListItem>
            ))}
          </List>
        ))}
      </Grid>
      )}
        {/* <MyFridge
          myFridge={myFridge}
          handleRemoveFromMyFridge={handleRemoveFromMyFridge}
          handleMoveToShoppingList={handleMoveToShoppingList}
        /> */}
      {/* My Fridge */}
        <Typography variant="h1" mb="48px">
        You might already have: 
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
              <Button onClick={() => handleMoveToShoppingList(i)} variant="outlined">Move to MyFridge</Button>
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

export default ShoppingListPage;
