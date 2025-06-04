import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HomePage.module.css'; // Importa nosso CSS Module

// A imagem original era: "https://cdn-icons-png.flaticon.com/512/4213/4213358.png"
// Vamos decidir se e como vamos usar uma imagem. Por enquanto, vou deixá-la comentada.
// Se quiser usar uma imagem local, coloque-a em 'frontend/public/images/'
// e use o caminho como '/images/nome-da-imagem.png'
// const cinemaImageUrl = "/images/cinema-home-icon.png";

const HomePage: React.FC = () => {
  return (
    <div className={styles.homePageContainer}>
      <div className={styles.welcomeContent}>
        {/* Se quiser reintroduzir uma imagem, poderia ser aqui ou como background */}
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
            🎞️ Gerenciar Filmes
          </Link>
          <Link to="/salas/cadastro" className={`${styles.actionButton} ${styles.salasButton}`}>
            🏟️ Gerenciar Salas
          </Link>
          <Link to="/sessoes/cadastro" className={`${styles.actionButton} ${styles.sessoesButton}`}>
            📅 Gerenciar Sessões
          </Link>
          <Link to="/ingressos/venda" className={`${styles.actionButton} ${styles.ingressosButton}`}>
            🎟️ Vender Ingressos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;