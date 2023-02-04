import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import ContactBanner from "./components/ContactBanner";
import DishCard from "./components/DishCard";
import Footer from "./components/Footer";
import theme from "./theme";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import BestRecipes from "./components/BestRecipes";


export default function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com">
        <Navbar />
        <Header />
        <BestRecipes />
        <ContactBanner />
        <Footer />
      </GoogleOAuthProvider>
    </ThemeProvider>
  );
}
