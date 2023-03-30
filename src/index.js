import React from 'react';
import App from './app/app';
import './styles/index.css';
import './styles/custom.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <HelmetProvider>
            <App />
         </HelmetProvider>
      </BrowserRouter>
   </React.StrictMode>
);
