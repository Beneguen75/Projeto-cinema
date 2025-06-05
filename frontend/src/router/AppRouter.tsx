import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import MainLayout from '../layouts/MainLayout';
import MovieManagementPage from '../features/movies/pages/MovieManagementPage';
import RoomManagementPage from '../features/rooms/pages/RoomManagementPage';

// Placeholder para páginas futuras
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <p>Conteúdo da página em breve...</p>
  </div>
);

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

      {/* Rota para Cadastro de Filmes */}
      <Route
        path="/filmes/cadastro" // Lembre-se que atualizamos este link na Navbar
        element={<MainLayout><MovieManagementPage /></MainLayout>}
      />

      <Route
        path="/salas/cadastro"
        element={<MainLayout><RoomManagementPage /></MainLayout>}
      />
      <Route
        path="/sessoes/cadastro"
        element={<MainLayout><PlaceholderPage title="Cadastro de Sessões" /></MainLayout>}
      />
      <Route
        path="/sessoes"
        element={<MainLayout><PlaceholderPage title="Listar Sessões" /></MainLayout>}
      />
      <Route
        path="/ingressos/venda"
        element={<MainLayout><PlaceholderPage title="Venda de Ingressos" /></MainLayout>}
      />

      <Route
        path="*"
        element={<MainLayout><PlaceholderPage title="404 - Página Não Encontrada" /></MainLayout>}
      />
    </Routes>
  );
};

export default AppRouter;