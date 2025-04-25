// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ThemeProvider } from '@material-tailwind/react'; // ✅ importer le provider
import { Provider } from 'react-redux';  // Importer le Provider de Redux
import store from './app/store';  // Importer ton store

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Envelopper l'application avec Provider */}
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
