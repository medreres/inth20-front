import React, { useEffect, useState } from "react";
import "./App.css";
import { GoogleOAuthProvider } from '@react-oauth/google';
import Navbar from "./components/Navbar";
import Header from "./container/Header";

function App() {
  const [isSSR, setIsSSR] = useState(true);
  
  useEffect(() => {
    setIsSSR(false);
  }, []);

  if(isSSR) return null;

  return (
  <div className="App">
    {/* <GoogleOAuthProvider clientId={`${process.env.PUBLIC_GOOGLE_API_TOKEN}`}> */}
    <GoogleOAuthProvider clientId="917756343353-s67bgmnpv97ijhfahvmjhu0iegr2t6pn.apps.googleusercontent.com">
      <Navbar /> 
      <div className="container">
        <Header />
      </div>
    </GoogleOAuthProvider>
  </div>
  )
}

export default App;
