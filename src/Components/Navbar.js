import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import '../styles/Main/Navbar/Navbar.css';



const Navbar = ({ categorias, onFilterClick, categoriaAtiva }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 

  const showSidebar = () => {
    setIsMenuOpen(true);
    const sidebar = document.querySelector('.togle-menu');
    sidebar.style.display = 'flex';
  };

  // Function to hide the sidebar
  const hideSidebar = () => {
    setIsMenuOpen(false);
    const sidebar = document.querySelector('.togle-menu');
    sidebar.style.display = 'none';
  };


// Adicionando ouvinte de eventos para redimensionamento da janela
useEffect(() => {
  function handleResize() {
    if (window.innerWidth > 825) {
      hideSidebar(); // Esconde o menu se a tela for maior que 825px
    }
  }

  // Adiciona o ouvinte de eventos quando o componente é montado
  window.addEventListener('resize', handleResize);

  // Limpa o ouvinte de eventos quando o componente é desmontado
  return () => window.removeEventListener('resize', handleResize);
}, []);

  return (
    <>
      <nav className="navbar">
      <a href="/" id='Logo'>
            <img src='/SiteLogo.png' alt='Logo' width={150}/>
          </a>

          <div className="regular-menu">
            <div id='filtros' className='hideOnMobile'  >
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
            </div>

            <div className='links'>
             {/* <a href='/team' className='hideOnMobile'>Team</a> 
            <a href='/about' className='hideOnMobile'>About</a>  */}
            {/* <Link to='/team'>MEET THE TEAM</Link> */}
  	    <Link to='/about'>ABOUT</Link>
            </div>

            <li className='menu-button' onClick={isMenuOpen ? hideSidebar : showSidebar}>
          {isMenuOpen
            ? <img src='/NavbarMenuTop.png' alt='Close Menu' width={50} />
            : <img src='/NavbarMenuDown.png' alt='Open Menu' width={50} />}
        </li>


       
        <div className="togle-menu">

<div >
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
    
    
    <div className='mobile-links'>
    <a href='/team' >MEET THE TEAM</a> 
    <a href='/about' >ABOUT</a> 
    </div>

    </div>
         
      </nav>
         
    </>
  );
};
export default Navbar;