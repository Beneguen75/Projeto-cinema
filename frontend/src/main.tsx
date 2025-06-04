import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Se você não importou o index.css no App.tsx, pode ser aqui.
// Mas é comum manter as importações de CSS mais perto do App.tsx.

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);