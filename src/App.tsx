import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import BestRecipes from "./features/Recipes/components/BestRecipes";
import BrowseRecipes from "./pages/BrowseRecipes";
import SearchRecipes from "./pages/SearchRecipes";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";
import MyFridge from "./pages/MyFridge";
import ShoppingList from "./pages/ShoppingList";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Browse Recipes */}
        <Route
          path="/browse-recipes"
          element={<BrowseRecipes />}
        />

        {/* Search Recipes */}
        <Route
          path="/search"
          element={<SearchRecipes />}
        />
        
        {/* Recipe Page */}
        <Route
          path="/recipe"
          element={<RecipePage />}
        />

        {/* My Fridge */}
        <Route
          path="/my-fridge"
          element={<MyFridge />}
        />
      </Routes>

      {/* Shopping List */}
      <Route
          path="/shopping-list"
          element={<ShoppingList />}
        />

      <Footer />
    </>
  );
}
