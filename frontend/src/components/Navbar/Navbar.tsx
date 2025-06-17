import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">🎬 Cinema</NavLink>
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
              <NavLink className="nav-link" to="/" end>Início</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/filmes/cadastro">Filmes</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/salas/cadastro">Salas</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sessoes/cadastro">Sessões</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sessoes" end>Em Cartaz</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ingressos/venda">Ingressos</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;