import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/system";
import React from "react";
import ContactBanner from "./components/ContactBanner";
import DishCard from "./components/DishCard";
import Footer from "./components/Footer";
import theme from "./theme";

// Update the Button's color prop options
const arr = [0, 1, 2, 3];

export default function CustomColor() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box
          display="flex"
          justifyContent="center"
          gap={3}
          m={3}
          >
          {arr.map((i) => (
            <DishCard key={i} />
          ))}
        </Box>
        <ContactBanner />
        <Footer />
      </ThemeProvider>
    </>
  );
}
