import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './router/AppRouter';

// Importa o CSS do Bootstrap para estar disponível globalmente
import 'bootstrap/dist/css/bootstrap.min.css';

// Importe seu CSS global customizado, se tiver (ex: para o body, fontes, etc.)
// Crie este arquivo se não existir: frontend/src/index.css
import './index.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};

export default App;