import React, { useState, useEffect } from 'react';
import '../styles/Main/OtherPages/about.css';
import Footer from '../Components/Footer';
import AboutNavbar from '../Components/Navbars/aboutNavar';

const AboutUs = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth <= 825 ? '/about/tryBout.png' : '/about/tryBout.png';
  const BannerimageUrl = windowWidth <= 825 ? '/about/aboutUsBanner.png' : '/about/aboutUsBanner.png';

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
      <AboutNavbar />
      <div className="about-us-container">
        <div className="logo-grid">
          <div className="logo-container">
          <img src={BannerimageUrl} alt="Client Logo" className="client-logo" />

            {/* <img src={imageUrl} alt="Client Logo" className="client-logo" /> */}

            <ClientGallery/>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;


const ClientGallery = () => {
  return (
    <>

    <div>
    <p className="client-name">CLIENTS</p>

    </div>
    <div className="client-gallery-container" style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>



      {/* Exemplo de um item da galeria de clientes */}
      <div className="client-gallery-item">
        <img src="/about/clientes/1.png" alt="Cliente 1" className="client-photo" />
        </div>
    
        <div className="client-gallery-item">
        <img src="/about/clientes/2.png" alt="Cliente 1" className="client-photo" />
        </div>
        
        <div className="client-gallery-item">
        <img src="/about/clientes/3.png" alt="Cliente 1" className="client-photo" />
        </div>

        <div className="client-gallery-item">
        <img src="/about/clientes/4.png" alt="Cliente 1" className="client-photo" />
        </div>

        <div className="client-gallery-item">
        <img src="/about/clientes/5.png" alt="Cliente 1" className="client-photo" />
        </div>
        <div className="client-gallery-item">
        <img src="/about/clientes/6.svg" alt="Cliente 1" className="client-photo" />
        </div>
        <div className="client-gallery-item">
        <img src="/about/clientes/7.png" alt="Cliente 1" className="client-photo" />
        </div>

      

        
        <div className="client-gallery-item">
        <img src="/about/clientes/8.jpg" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/9.jpg" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/10.png" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/11.png" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/12.png" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/13.png" alt="Cliente 1" className="client-photo" />
        </div>
    </div>
    <p className="client-detail">AND MANY MORE</p>

    </>
  );
};