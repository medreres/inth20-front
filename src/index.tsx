import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <>
    {/* <GoogleOAuthProvider store={store}> */}
    {/* <Router> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </Router> */}
    {/* </Provider> */}
  </>
);
