import React, { useState } from 'react';
import '../../styles/Main/DetailNavbar/DetailNavbar.css';

const TeamNavbar = () => {
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
          <a href='/' className='hideOnMobile'>PORTFOLIO</a>
          <a href='/about' className='hideOnMobile'>ABOUT</a> 
          {/* <a href='/about' className='hideOnMobile'>About</a> */}
        </div>
        <li className='menu-button' onClick={isMenuOpen ? hideSidebar : showSidebar}>
          {isMenuOpen
            ? <img src='/NavbarMenuTop.png' alt='Close Menu' width={50} />
            : <img src='/NavbarMenuDown.png' alt='Open Menu' width={50} />}
        </li>
        <div className="togle-menu">
          <div className='mobile-links'>
            <a href='/' >PORTFOLIO</a>     
            <a href='/about' >ABOUT</a> 
            {/* <a href='/about' >About</a> */}
          </div>
        </div>
      </nav>
    </>
  );
};

export default TeamNavbar;
