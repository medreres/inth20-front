import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Router } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import AuthContextProvider from "./context/auth-context";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <AuthContextProvider>
    <ThemeProvider theme={theme}>
      <GoogleOAuthProvider clientId="959926205727-fp4plq0amjds5pcskttcmttg713gk6oe.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </AuthContextProvider>
);
