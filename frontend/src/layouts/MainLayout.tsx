import React, { type ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './MainLayout.module.css'; // Importa o CSS Module

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}> {/* Aplica a classe .layout */}
      <Navbar />
      {/* Removi as classes "container mt-5" daqui, pois a página filha (HomePage) controlará seu próprio padding e centralização */}
      <main className={styles.content}> {/* Aplica a classe .content */}
        {children}
      </main>
      {/* Footer aqui, se houver */}
    </div>
  );
};

export default MainLayout;