import React from 'react';
import App from './app/app';
import './styles/index.css';
import './styles/custom.css';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
);
