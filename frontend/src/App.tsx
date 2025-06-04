import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Importações para react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // CSS do react-toastify

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
      {/* Adicione o ToastContainer aqui, fora do Router mas dentro do BrowserRouter se quiser */}
      {/* Ou pode ser no final do AppRouter, ou dentro de um MainLayout global */}
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