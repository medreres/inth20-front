import React from "react";
import BestRecipes from "../features/Recipes/components/BestRecipes";
import ContactBanner from "../components/ContactBanner";
import Header from "../components/Header";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box px={{ xs: "36px", sm: "48px", md: "96px" }}>
        <Header />
        <BestRecipes />
      </Box>
      <ContactBanner />
    </>
  );
}
