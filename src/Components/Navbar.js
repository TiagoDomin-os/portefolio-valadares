import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main/Navbar/Navbar.css';

const Navbar = ({ categorias, onFilterClick, categoriaAtiva }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-active', isMenuOpen);
  },

  showSidebar = () => {
    const sidebar = document.querySelector('.togle-menu')
    sidebar.style.display = 'flex';
  } , 

  hideSidebar = () => {
    const sidebar = document.querySelector('.togle-menu')
    sidebar.style.display = 'none';
  }  

  return (
    <>
      <nav className="navbar">
         
          <a href="/" >
            <img src='/SiteLogo.png' alt='Logo' width={180}/>
          </a>


          <div >
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
            
            <Link to="/team" className='hideOnMobile'>Team   </Link>

            <Link to="/about" className='hideOnMobile'> About</Link>

            <li onClick= {showSidebar} className='menu-button'>          
                <a href='#'> <img src='/NavbarMenuTop.png' width={30}></img></a>
          </li>
           </div>

           <div className="togle-menu">
           <li onClick= {hideSidebar}>          
                <a href='#'> <img src='/NavbarMenuDown.png' width={30}></img></a>
          </li>

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
            
            <Link to="/team" >Team   </Link>
            <Link to="/about"> About</Link>
            

            </div>
         
         
      </nav>
      
    </>
  );
};

export default Navbar;
