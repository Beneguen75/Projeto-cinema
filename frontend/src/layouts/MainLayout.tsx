import React, { type ReactNode } from 'react';
import Navbar from '../components/Navbar/Navbar';
import styles from './MainLayout.module.css'; 

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className={styles.layout}> 
      <Navbar />
      <main className={styles.content}> 
        {children}
      </main>
    </div>
  );
};

export default MainLayout;