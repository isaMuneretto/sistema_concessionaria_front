// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from "react-router-dom";

const MenuSuperior = () => {
  const menuStyle = {
    width: '100%', // Ocupar toda a largura
    position: 'fixed', // Posição fixa
    top: 0, // No topo da página
  };

  return (
    <nav style={menuStyle} className="navbar navbar-expand-sm bg-primary navbar-dark sticky-top">
      <div className="container">
        <Link to="/" className="navbar-brand">Controle de Automóveis</Link>
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/automoveis" className="nav-link">Incluir Automóvel</Link>
          </li>
          
          <li className="nav-item">
            <Link to="/manutencao" className="nav-link">Manutenção de Automóveis</Link>
          </li>
          <li className="nav-item">
            <Link to="/funcionario" className="nav-link">Cadastrar Funcionário</Link>
          </li>
          
        </ul>
      </div>
    </nav>
  );
};

export default MenuSuperior;