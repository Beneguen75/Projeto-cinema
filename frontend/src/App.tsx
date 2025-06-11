import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import './index.css';

// Importações para react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS do react-toastify

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      <ToastContainer
        position="top-right" // Posição das notificações
        autoClose={3000} // Fecha automaticamente após 3 segundos
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" // Ou "dark", "colored"
      />
    </BrowserRouter>
  );
};

export default App;