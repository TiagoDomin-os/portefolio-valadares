import React, { useState, useEffect } from 'react';
import '../styles/about.css';
import DetailNavbar from '../Components/DetailNavbar';
import Footer from '../Components/Footer';

const AboutUs = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth <= 825 ? '/about/vertical.png' : '/about/normal.png';

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <>
      <DetailNavbar />
      <div className="about-us-container">
        <div className="logo-grid">
          <div className="logo-container">
            <img src={imageUrl} alt="Client Logo" className="client-logo" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
