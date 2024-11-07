import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

      <BrowserRouter>
      <GoogleOAuthProvider clientId="872238526034-s704pdne3nvpcf3j59i1vfjsesu8p7o1.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
      </BrowserRouter>
     
  </React.StrictMode>
);

reportWebVitals();
