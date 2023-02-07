import React from "react";
import BestRecipes from "../features/Recipes/components/BestRecipes";
import ContactBanner from "../components/ContactBanner";
import Header from "../components/Header";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <>
      <Box mx={{ xs: "2em", md: "6em" }}>
        <Header />
        <BestRecipes />
      </Box>
      <ContactBanner />
    </>
  );
}
