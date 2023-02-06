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
import { useEffect } from "react";
import axios from "axios";

export default function App() {
  useEffect(() => {
    const cleanup = setTimeout(() => {
      axios.get("https://int20h.onrender.com/alive");
    }, 300000); // 5 min

    return () => {
      clearTimeout(cleanup);
    };
  }, []);
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

        {/* TODO make work with params */}
        {/* Search Recipes */}
        <Route
          path="/search"
          element={<SearchRecipes />}
        />

        {/* TODO make work with id */}
        <Route
          path="/recipe"
          element={<RecipePage />}
        />
      </Routes>
      <Footer />
    </>
  );
}
