import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Router } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <GoogleOAuthProvider store={store}> */}
      {/* <Router> */}
        <App />
      {/* </Router> */}
    {/* </Provider> */}
  </React.StrictMode>
);

