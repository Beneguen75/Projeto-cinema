import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
// Importando ícones do Font Awesome (parte do react-icons)
import { FaFilm, FaDoorOpen, FaCalendarAlt, FaTicketAlt } from 'react-icons/fa';

// const cinemaImageUrl = "/images/cinema-home-icon.png";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.welcomeContent}>
        {/* {cinemaImageUrl && <img src={cinemaImageUrl} alt="Ícone Cinema" className={styles.decorativeImage} />} */}
        <div className={styles.textBlock}>
          <h1 className={styles.title}>🎬 Bem-vindo ao Sistema de Gestão de Cinema</h1>
          <p className={styles.subtitle}>
            Organize e controle todas as operações do seu cinema com facilidade e eficiência.
          </p>
          <p className={styles.description}>
            Navegue pelas seções para gerenciar filmes, configurar salas, agendar sessões e processar a venda de ingressos. Tudo o que você precisa em um só lugar.
          </p>
        </div>

        <div className={styles.actionButtons}>
          <Link to="/filmes/cadastro" className={`${styles.actionButton} ${styles.filmesButton}`}>
            <FaFilm className={styles.buttonIcon} /> Gerenciar Filmes
          </Link>
          <Link to="/salas/cadastro" className={`${styles.actionButton} ${styles.salasButton}`}>
            <FaDoorOpen className={styles.buttonIcon} /> Gerenciar Salas
          </Link>
          <Link to="/sessoes/cadastro" className={`${styles.actionButton} ${styles.sessoesButton}`}>
            <FaCalendarAlt className={styles.buttonIcon} /> Gerenciar Sessões
          </Link>
          <Link to="/ingressos/venda" className={`${styles.actionButton} ${styles.ingressosButton}`}>
            <FaTicketAlt className={styles.buttonIcon} /> Vender Ingressos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;