import React, { useState, useEffect } from 'react';
import '../styles/Main/OtherPages/team.css';
import DetailNavbar from '../Components/DetailNavbar';
import Footer from '../Components/Footer';

const Team = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth <= 825 ? '/team/team_vertical.png' : '/team/team.png';
  const BannerimageUrl = windowWidth <= 825 ? '/about/BannetTeam.png' : '/about/BannetTeam.png';


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
          <img src={BannerimageUrl} alt="Client Logo" className="client-logo" />

            <img src={imageUrl} alt="Client Logo" className="client-logo" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
