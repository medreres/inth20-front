import Footer from "./components/Footer";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import BrowseRecipes from "./pages/BrowseRecipes";
import SearchRecipes from "./pages/SearchRecipes";
import Home from "./pages/Home";
import RecipePage from "./pages/RecipePage";


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

        <Route
          path="/recipe"
          element={<RecipePage />}
        />
      </Routes>
      <Footer />
    </>
  );
}
