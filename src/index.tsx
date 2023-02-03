import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter } from "react-router-dom";
import { Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider store={store}> */}
      {/* <Router> */}
      <BrowserRouter> 
        <App />
      </BrowserRouter> 
      {/* </Router> */}
    {/* </Provider> */}
  </React.StrictMode>
);

