import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const BackofficeNavbar = () => {
    return (
        <nav className="navbar">
          <div className="navbar-container">
            <img src='/SiteLogo.png' alt='Logo' style={{ maxWidth: '200px', maxHeight: '90px' }} />
            <div className="menu">
              {/* Link para a página principal da lista de projetos no backoffice */}
              <Link to="/backoffice" className="backoffice-nav-link">Lista de Projetos           </Link>
              {/* Link para a página de adicionar novos projetos */}
              <Link to="/add-project" className="backoffice-nav-link">Adicionar Projeto</Link>
            
            </div>
          </div>
        </nav>
      );
    };

export default BackofficeNavbar;
