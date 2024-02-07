import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaHeart, FaYoutube } from 'react-icons/fa';
import '../styles/Main/Footer.css'; // Importando o arquivo CSS


const Footer = () => {

  const handleEmailClick = () => {
    window.location.href = 'mailto:uniquevisionstudios.info@gmail.com'; // Abre o cliente de e-mail padrão com o endereço fornecido
  };




  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="https://www.instagram.com/unique.vision.studios/" aria-label="Instagram"><FaInstagram /></Link>
      
        <button onClick={handleEmailClick} aria-label="Email" className="footer-link"><FaEnvelope className="footer-icon" /></button>
       
      </div>
      
      <div className="footer-text">
        <p>
          &copy;{new Date().getFullYear()} Unique Vision Studios. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
