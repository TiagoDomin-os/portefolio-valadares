import React, { useState, useEffect } from 'react';
import '../styles/Main/OtherPages/team.css';
import TeamNavbar from '../Components/Navbars/teamNavbar';
import Footer from '../Components/Footer';

const Team = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth <= 825 ? '/claqueteWhite.png' : '/claqueteWhite.png';
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
      <TeamNavbar />
      <div className="logo-title-text">
        <img src={imageUrl} alt="Client Logo" className="client-logo" />
        <div className="team-title" >MEET THE TEAM</div>
       
      </div>
      <div className="about-us-container">
        <div className="logo-grid">
          <div className="logo-container">
            {/* Outros elementos ou componentes que vão aqui dentro */}
          </div>
        </div>
      </div>
      <Gallery />
      <Footer />
    </>
  );
};

export default Team;


const Gallery = () => {
  return (
    <div className="team-gallery-container" >
      <div className="team-member">
        <img src="/team/teamMembers/1.png" alt="Diogo Valadares" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">DIOGO VALADARES</p>
          <p className="credit-category">Director & Creative Director</p>
        </div>
      </div>

      
      <div className="team-member">
        <img src="/team/teamMembers/2.png" alt="Diogo Valadares" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">RODRIGO GODINHO</p>
          <p className="credit-category">Camera & Light Department</p>
        </div>
      </div>
    
      <div className="team-member">
        <img src="/team/teamMembers/3.jpg" alt="MIGUEL LEAL COSTA" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">MIGUEL LEAL COSTA</p>
          <p className="credit-category">Steadicam & Camera Operator</p>
        </div>
      </div>
    
      <div className="team-member">
        <img src="/team/teamMembers/4.png" alt="ANTÓNIO SILVA" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">ANTÓNIO SILVA</p>
          <p className="credit-category">Production Sound Mixer</p>
        </div>
      </div>

      <div className="team-member">
        <img src="/team/teamMembers/5.png" alt="JOÃO PEIXOTO" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">JOÃO PEIXOTO</p>
          <p className="credit-category">CG ARTIST</p>
        </div>
      </div>
      <div className="team-member">
        <img src="/team/teamMembers/6.png" alt="DIOGO PALMA" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">DIOGO PALMA</p>
          <p className="credit-category">Camera Operator</p>
        </div>
      </div>
      <div className="team-member">
        <img src="/team/teamMembers/7.png" alt="TOMÁS LOURENÇO" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">TOMÁS LOURENÇO</p>
          <p className="credit-category">Editor</p>
        </div>
      </div>

      <div className="team-member">
        <img src="/team/teamMembers/8.png" alt="Diogo Valadares" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">FRANCISCO CORREIA</p>
          <p className="credit-category">Camera & Editor</p>
        </div>
      </div>

      <div className="team-member">
        <img src="/team/teamMembers/9.jpg" alt="Diogo Valadares" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">KYM WILLER</p>
          <p className="credit-category">Photographer</p>
        </div>
      </div>

    </div>

    

    
  );
};

