import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import { HomePage } from './pages/HomePage';
import store, { StoreContext } from 'stores';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StoreContext.Provider value={{ ...store }}>
      <HomePage />
    </StoreContext.Provider>
  </React.StrictMode>
);