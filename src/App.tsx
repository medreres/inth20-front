import { ThemeProvider } from "@emotion/react";
import React from "react";
import ContactBanner from "./components/ContactBanner";
import Footer from "./components/Footer";
import theme from "./theme";

// Update the Button's color prop options

export default function CustomColor() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <ContactBanner />
        <Footer />
      </ThemeProvider>
    </>
  );
}
