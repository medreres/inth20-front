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
      <GoogleOAuthProvider clientId="959926205727-sk1i8lcga7v8bdrlu0jehkd8jv836cea.apps.googleusercontent.com">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </AuthContextProvider>
);
