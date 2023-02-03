import { ThemeProvider } from "@emotion/react";
import React from "react";
import Footer from "./components/Footer";
import theme from "./theme";

// Update the Button's color prop options

export default function CustomColor() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Footer />
      </ThemeProvider>
    </>
  );
}
