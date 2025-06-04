import React, { ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <Navbar />
      {/* A classe container e mt-5 (margem no topo) do Bootstrap ajudam a centralizar e espaçar o conteúdo */}
      <main className="container mt-5">
        {children}
      </main>
      {/* Você pode adicionar um Footer aqui no futuro, se desejar */}
      {/* <footer className="text-center mt-5">
        <p>&copy; {new Date().getFullYear()} Projeto Cinema. Todos os direitos reservados.</p>
      </footer> */}
    </div>
  );
};

export default MainLayout;