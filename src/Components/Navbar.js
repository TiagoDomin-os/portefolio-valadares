import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main/Navbar/Navbar.css';

const Navbar = ({ categorias, onFilterClick, categoriaAtiva }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-active', isMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
          <a href="/" className="logo">
            <img src='/SiteLogo.png' alt='Logo' />
          </a>
          <div className="regular-menu">
            <div className='filtros'>
            {categorias.map((categoria, index) => (
              <button
                key={index}
                onClick={() => onFilterClick(categoria)}
                className={categoriaAtiva === categoria ? 'nav-link active' : 'nav-link'}
              >
                {categoria}
              </button>
            ))}
            </div>
            
            <Link to="/about" className="nav-link ">About</Link>
          </div>
          <div className="menu-icon" onClick={toggleMenu} >
            <img src={isMenuOpen ? '/NavbarMenuTop.png' : '/NavbarMenuDown.png'} alt='Menu' width={35}/>
          </div>
      </nav>
      {isMenuOpen && (
        <div className="menu-overlay">
          <div className="menu-content">

          {categorias.map((categoria, index) => (
              <button
                key={index}
                onClick={() => onFilterClick(categoria)}
                className={categoriaAtiva === categoria ? 'nav-link active' : 'nav-link'}
              >
                {categoria}
              </button>
            ))}

<Link to="/about" className="nav-link about-link">About</Link>

            </div>
            
            {/* <Link to="/about" className="nav-link about-link">About</Link> */}

        </div>
      )}
    </>
  );
};

export default Navbar;
