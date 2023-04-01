import React from 'react';
import App from './app/app';
import './styles/index.css';
import './styles/custom.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import Message from './components/message';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <HelmetProvider>
               <App />
               <Message />
            </HelmetProvider>
         </BrowserRouter>
      </Provider>
   </React.StrictMode>
);
