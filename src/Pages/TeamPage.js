import React, { useState, useEffect } from 'react';
import '../styles/Main/OtherPages/team.css';
import TeamNavbar from '../Components/Navbars/teamNavbar';
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
      <TeamNavbar />
      <img
  src={BannerimageUrl}
  alt="Banner"
  style={{
    display: 'block', // Isso garante que a imagem seja tratada como um bloco
    maxWidth: '1200px', // A largura máxima que a imagem pode ter
    width: '100%', // Isso faz com que a imagem seja responsiva e ocupe 100% do seu contêiner até sua largura máxima
    height: 'auto', // Mantém a proporção da imagem
    margin: 'auto', // Centraliza a imagem horizontalmente
    padding: '20px', // Adiciona espaço ao redor da imagem
  }}
/>
      <Gallery />
      <Footer />
    </>
  );
};

export default Team;


const Gallery = () => {
  return (
    <div className="gallery-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
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
        <img src="/team/teamMembers/3.png" alt="MIGUEL LEAL COSTA" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">MIGUEL LEAL COSTA</p>
          <p className="credit-category">Steadicam & Camera Operator</p>
        </div>
      </div>
    
      <div className="team-member">
        <img src="/team/teamMembers/4.png" alt="ANTÓNIO SILVA" className="team-photo" />
        <div className="team-info">
          <p className="credit-title">ANTÓNIO SILVA</p>
          <p className="credit-category">Sound Director</p>
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

    </div>

    

    
  );
};

