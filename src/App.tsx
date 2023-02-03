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

const arr = [1, 2, 3];

function App() {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* <GoogleOAuthProvider clientId={`${process.env.PUBLIC_GOOGLE_API_TOKEN}`}> */}
        <GoogleOAuthProvider clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com">
          <Box
            display="flex"
            justifyContent="center"
            gap={3}
            m={3}>
            {arr.map((i) => (
              <DishCard key={i} />
            ))}
          </Box>
          <Navbar />
          <Header />
          <ContactBanner />
          <Footer />
        </GoogleOAuthProvider>
      </ThemeProvider>
    </div>
  );
}
