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
  Autocomplete,
  FormHelperText,
} from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import categories from "../data/categories.json";
import ingredients from "../data/ingredients.json";

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
  const [ingredientTouched, setIngredientTouched] = useState(false);
  const [ingredientError, setIngredientError] = useState(false);
  const [categoryTouched, setCategoryTouched] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const formSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let err = false;

    if (!ingredientTouched || title.length < 2) {
      setIngredientError(true);
      err = true;
    }
    if (!categoryTouched) {
      setCategoryError(true);
      err = true;
    }

    if (!amountTouched || amount.length < 1) {
      setAmountError(true);
      err = true;
    }

    if (err) return;

    setIngredientTouched(false);
    setIngredientError(false);
    setCategoryTouched(false);
    setCategoryError(false);
    setAmountTouched(false);
    setAmountError(false);
    submitHandler();
  };
  return (
    <form onSubmit={(e) => formSubmitHandler(e)}>
      <Grid
        item
        md={6}
        mb="16px">
        <TextField
          error={ingredientError}
          autoComplete="off"
          label="Enter ingredient"
          variant="outlined"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setIngredientTouched(true);

            // console.log(title)
            if (title.length > 1) setIngredientError(false);
          }}
          fullWidth
          color="secondary"
          helperText={ingredientError && "Enter valid ingredient name"}
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
          options={ingredients.ingredients.map((option) => option)}
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
          fullWidth
          error={categoryError}>
          <InputLabel id="category-select-label">Choose a category</InputLabel>
          <Select
            labelId="category-select-label"
            label="Choose a category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as string);
              setCategoryTouched(true);
              setCategoryError(false);
            }}>
            {categories.categories.map((category) => (
              <MenuItem
                key={category}
                value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
          {categoryError && <FormHelperText>Chose category</FormHelperText>}
        </FormControl>
      </Grid>
      <Grid
        item
        xs={6}
        sm={4}
        mb="16px">
        <FormControl>
          <TextField
            error={amountError}
            helperText={amountError && "Set amount"}
            label="Enter amount"
            value={amount}
            onChange={(e) => {
              setAmountTouched(true);
              setAmount(e.target.value);
              setAmountError(false);
            }}
            color="secondary"
            fullWidth
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        mb={{ xs: "24px", sm: "48px" }}>
        <Button
          type="submit"
          variant="text"
          fullWidth
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
    </form>
  );
}
