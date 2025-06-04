import React from 'react';
import { Link } from 'react-router-dom';

// Se você criar um Navbar.module.css para estilos específicos da Navbar,
// descomente a linha abaixo:
// import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🎬 Cinema</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Início</Link>
            </li>
            <li className="nav-item">
              {/* Atualize estes links conforme as rotas das suas features */}
              <Link className="nav-link" to="/filmes/cadastro">Cadastro de Filmes</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/salas/cadastro">Cadastro de Salas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessoes/cadastro">Cadastro de Sessões</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sessoes">Listar Sessões</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ingressos/venda">Ingressos</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;