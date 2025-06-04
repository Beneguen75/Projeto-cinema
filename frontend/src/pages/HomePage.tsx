import React from 'react';
import { Link } from 'react-router-dom';

// Idealmente, mova esta URL para uma constante ou importe a imagem
// dos seus assets locais (ex: src/assets/images/cinema-icon.png)
const cinemaImageUrl = "https://cdn-icons-png.flaticon.com/512/4213/4213358.png";

// Estilos que estavam no <style> do seu index.html.
// É melhor movê-los para um arquivo CSS (ex: HomePage.module.css ou um global).
const welcomeWrapperStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row', // Em telas menores, era column-reverse
  alignItems: 'center',
  gap: '2rem',
  padding: '2rem 1rem', // Ajuste para responsividade depois
  justifyContent: 'center',
};

const welcomeCardStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  padding: '2rem',
  maxWidth: '700px',
  width: '100%',
  textAlign: 'center',
};

const welcomeImgStyle: React.CSSProperties = {
  maxWidth: '250px',
  width: '80%', // Para telas menores
};


const HomePage: React.FC = () => {
  return (
    // No futuro, você pode querer aplicar o 'flex-direction: column-reverse;'
    // em telas menores usando media queries em um arquivo CSS.
    <div className="welcome-wrapper" style={welcomeWrapperStyle}>
      <div className="welcome-card" style={welcomeCardStyle}>
        <h2>🎬 Bem-vindo ao Sistema de Gestão de Cinema</h2>
        <p className="lead mt-2">Organize e controle todas as operações do seu cinema com facilidade.</p>
        <p>Acesse as áreas de <strong>cadastro de filmes</strong>, <strong>salas</strong>, <strong>sessões</strong> e <strong>venda de ingressos</strong> através do menu ou dos atalhos abaixo.</p>

        <div className="btn-group d-flex flex-wrap justify-content-center gap-2 mt-4">
          <Link to="/filmes/cadastro" className="btn btn-outline-primary">🎞️ Filmes</Link>
          <Link to="/salas/cadastro" className="btn btn-outline-primary">🏟️ Salas</Link>
          <Link to="/sessoes/cadastro" className="btn btn-outline-primary">📅 Sessões</Link>
          <Link to="/ingressos/venda" className="btn btn-outline-success">🎟️ Ingressos</Link>
        </div>
      </div>
      <img src={cinemaImageUrl} alt="Cinema" className="welcome-img" style={welcomeImgStyle} />
    </div>
  );
};

export default HomePage;