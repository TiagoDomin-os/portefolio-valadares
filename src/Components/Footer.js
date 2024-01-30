import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaEnvelope, FaHeart } from 'react-icons/fa';
import '../styles/Main/Footer.css'; // Importando o arquivo CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <Link to="https://www.instagram.com/unique.vision.studios/" aria-label="Instagram"><FaInstagram /></Link>
        <Link to="/" aria-label="Email"><FaEnvelope /></Link>
        <Link to="/" aria-label="Favorites"><FaHeart /></Link>
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
