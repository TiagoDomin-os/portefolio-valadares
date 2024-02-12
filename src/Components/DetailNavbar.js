import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Main/Navbar/DetailNavbar.css';

const DetailNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMenuOpen(false); // Fecha o menu quando o tamanho da tela muda
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <a href="/">
                    <img src='/SiteLogo.png' alt='Logo' className="logo" />
                </a>
                <div className='links'>
                <Link to="/team" className="nav-link desktop-link" >Team</Link>

                <Link to="/about" className="nav-link desktop-link">About</Link>
                </div>
               

                <div className="menu-icon" onClick={toggleMenu}>
                    <img src='../../NavbarMenuTop.png' alt='Menu' className="mobile-icon"  width={35}/>
                </div>
            </div>
            {isMenuOpen && (
                <div className="menu-overlay">
                    <div className="menu-content">
                        <Link to="/about" className="nav-link" onClick={toggleMenu}>About</Link>
                        <Link to="/about" className="nav-link" onClick={toggleMenu}>Team</Link>

                        {/* Adicione mais itens de menu aqui se necessário */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default DetailNavbar;
