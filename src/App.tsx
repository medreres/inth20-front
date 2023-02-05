import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ContactBanner from "./components/ContactBanner";

import Footer from "./components/Footer";
import theme from "./theme";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import BestRecipes from "./features/Recipes/components/BestRecipes";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BrowseRecipes from "./pages/BrowseRecipes";
import SearchRecipes from "./pages/SearchRecipes";
import AuthContextProvider from "./context/auth-context";

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
      </Routes>
      <Footer />
    </>
  );
}
