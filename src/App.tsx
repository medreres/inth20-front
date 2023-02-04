import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ContactBanner from "./components/ContactBanner";
import DishCard from "./features/Recipes/DishCard";
import Footer from "./components/Footer";
import theme from "./theme";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import BestRecipes from "./features/Recipes/BestRecipes";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseRecipes from "./pages/BrowseRecipes";
import SearchRecipes from "./pages/SearchRecipes";

export default function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  // ? What does it do?
  // if (isSSR) return null;

  return (
    <ThemeProvider theme={theme}>
      {/* <GoogleOAuthProvider clientId={`${process.env.PUBLIC_GOOGLE_API_TOKEN}`}> */}
      {/* <GoogleOAuthProvider store={store}> */}
      <GoogleOAuthProvider clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com">
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
        </Routes>
        <Footer />
      </GoogleOAuthProvider>
    </ThemeProvider>
    // </Provider>
    // </GoogleOAuthProvider>
    // </ThemeProvider>
  );
}
