import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import MovieManagementPage from '../features/movies/pages/MovieManagementPage';
import RoomManagementPage from '../features/rooms/pages/RoomManagementPage';
import SessionManagementPage from '../features/sessions/pages/SessionManagementPage';
import SessionListPage from '../pages/SessionListPage';
import TicketSalesPage from '../features/tickets/pages/TicketSalesPage';

const AppRouter = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/filmes/cadastro" element={<MovieManagementPage />} />
        <Route path="/salas/cadastro" element={<RoomManagementPage />} />
        <Route path="/sessoes/cadastro" element={<SessionManagementPage />} />
        <Route path="/sessoes" element={<SessionListPage />} />
        <Route path="/ingressos/venda/:sessionId" element={<TicketSalesPage />} />
      </Routes>
    </MainLayout>
  );
};

export default AppRouter;