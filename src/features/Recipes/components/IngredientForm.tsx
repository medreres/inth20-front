import {
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";

interface IngredientFormProps {
  buttonLabel: string;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>;
  submitHandler: () => void;
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
export default function IngredientForm({
  buttonLabel,
  title,
  setTitle,
  category,
  setCategory,
  amount,
  setAmount,
  submitHandler,
}: IngredientFormProps) {
  return (
    <>
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
          onClick={submitHandler}
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
          <Typography variant="h2">{buttonLabel}</Typography>
        </Button>
      </Grid>
    </>
  );
}
