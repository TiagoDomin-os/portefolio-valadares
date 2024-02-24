import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Main/Navbar/Navbar.css';

const BackofficeNavbar = () => {
    return (
        <nav className="navbar">
            
            <img src='/SiteLogo.png'  id='Logo' alt='Logo' style={{ maxWidth: '200px', maxHeight: '90px' }} />
            <div className="menu">

              <div className='links'>
                          {/* <Link to="/backoffice" >Site         </Link> */}

              <Link to="/backoffice/" >Lista de Projetos           </Link>
              <Link to="/backoffice/add-project" >Adicionar Projeto</Link>
              </div>
          </div>
        </nav>
      );
    };

export default BackofficeNavbar;
