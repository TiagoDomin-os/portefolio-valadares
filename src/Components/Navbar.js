import React, { useState } from 'react';
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
            <Link to='/team'>Team</Link>
  	    <Link to='/about'>About</Link>
            </div>

            <li className='menu-button' onClick={isMenuOpen ? hideSidebar : showSidebar}>
          {isMenuOpen
            ? <img src='/NavbarMenuDown.png' alt='Close Menu' width={50} />
            : <img src='/NavbarMenuTop.png' alt='Open Menu' width={50} />}
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
    <a href='/team' >Team</a> 
    <a href='/about' >About</a> 
    </div>

    </div>
         
      </nav>
         
    </>
  );
};
export default Navbar;