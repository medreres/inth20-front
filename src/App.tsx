import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
  <div className="App">
    {/* <GoogleOAuthProvider clientId={`${process.env.PUBLIC_GOOGLE_API_TOKEN}`}> */}
    <GoogleOAuthProvider clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com">


      <Navbar />
    </GoogleOAuthProvider>
  </div>
  )
}

export default App;
