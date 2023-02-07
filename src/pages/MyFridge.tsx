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
import categoriesListed from "../features/Recipes/data/categories.json";
import { useNavigate } from "react-router-dom";

interface MyFridgeItem {
  ingredient: string;
  category: string;
  amount: string;
}

const MyFridge = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const { ingredients, categories, setIngredients, isLoading } = useRecipeContext();
  const { idToken } = useAuthContext();
  const [filterBy, setFilterBy] = useState("all");
  const ingredientsFiltered = ingredients.filter((ingredient) =>
    filterBy === "all" ? true : ingredient.category.title === filterBy
  );
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

  const findFridgeBased = () => {
    const ingredientsFormatted = ingredients
      .map((ingredient) => ingredient.title.toLowerCase().split(" ").join("_"))
      .join(",");
    navigate("/fridge-based?ingredients=" + ingredientsFormatted);
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
        <Typography mb="10px" variant="h1">My Fridge</Typography>
        <Typography
          mb="48px"
          variant="body1">
          write ingredients only in singular
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
              <>
                <FormControl color="secondary">
                  <InputLabel id="Filter_by">Filter By</InputLabel>
                  <Select
                    labelId="Filter_by"
                    id="Filter_by_input"
                    value={filterBy}
                    label="Filter by category"
                    onChange={(e) => setFilterBy(e.target.value)}>
                    <MenuItem value="all">All</MenuItem>
                    {categories.map((category) => (
                      <MenuItem
                        key={category}
                        value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Grid item>
                  {filterBy === "all" ? (
                    <>
                      {categories.map((category) => {
                        const filteredByCategory = ingredients.filter(
                          (ingredient) => ingredient.category.title === category
                        );
                        return (
                          <>
                            <Box
                              key={category}
                              pb={{ xs: "24px", md: "48px" }}>
                              <List>
                                <Typography
                                  variant="h2"
                                  mb="16px">
                                  {category}
                                  <span style={{ color: "#28D681", paddingLeft: "8px" }}>
                                    ({filteredByCategory.length})
                                  </span>
                                </Typography>
                                {filteredByCategory.map((ingredient, i) => (
                                  <ListItem key={ingredient.id}>
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
                          </>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      <Box
                        key={filterBy}
                        pb={{ xs: "24px", md: "48px" }}>
                        <List>
                          <Typography
                            variant="h2"
                            mb="16px">
                            {filterBy}
                            <span style={{ color: "#28D681", paddingLeft: "8px" }}>({ingredientsFiltered.length})</span>
                          </Typography>
                          {ingredientsFiltered.map((ingredient, i) => (
                            <ListItem key={ingredient.id}>
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
                    </>
                  )}
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}>
                    <Button
                      onClick={findFridgeBased}
                      // href="/fridge-based"
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
              </>
            )}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default MyFridge;
