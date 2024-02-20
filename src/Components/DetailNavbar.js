import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main/Navbar/DetailNavbar.css';
const DetailNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.classList.toggle('menu-active', isMenuOpen);
  };

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

         
            <div className='links'>
             <a href='/team' className='hideOnMobile'>Team</a> 
            <a href='/about' className='hideOnMobile'>About</a> 
            </div>

            <li className='menu-button' onClick={isMenuOpen ? hideSidebar : showSidebar}>
          {isMenuOpen
            ? <img src='/NavbarMenuDown.png' alt='Close Menu' width={170} />
            : <img src='/NavbarMenuTop.png' alt='Open Menu'  width={170} />}
        </li>


        <div className="togle-menu">

      
            
            
            <div className='mobile-links'>
            <a href='/' >Home</a>     
            <a href='/team' >Team</a> 
            <a href='/about' >About</a> 
            </div>

            </div>
         
         
      </nav>
         
    </>
  );
};
export default DetailNavbar;