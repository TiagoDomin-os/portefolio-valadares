import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-container">
          {/* Note que a tag para imagens em JSX é <img> e não <image> */}
          <img src='/SiteLogo.png' alt='Logo' style={{ maxWidth: '200px', maxHeight: '90px' }} />
          <div className="menu">
            {/* Se você pretende usar o React Router, você pode querer usar o componente Link aqui */}
            <Link to="/about" className="about">About</Link>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;
