import React, { useState, useEffect } from 'react';
import '../styles/Main/OtherPages/about.css';
import Footer from '../Components/Footer';
import AboutNavbar from '../Components/Navbars/aboutNavar';

const AboutUs = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const imageUrl = windowWidth <= 825 ? '/claqueteWhite.png' : '/claqueteWhite.png';
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


      <div className="logo-title-text">
          
          <img src={imageUrl} alt="Client Logo" className="client-logo"  />
          <div className="about-title">ABOUT US</div>
          <p className="about-text">
            WE TAKE PRIDE IN BRINGING OUR CLIENT’S VISION TO LIFE. TOGETHER WE MAKE YOUR DREAMS, A VIVID REALITY.<br></br><br></br> BASED IN LISBON & WARSAW.
          </p>
        </div>
      <div className="about-us-container">
        <div className="logo-grid">
          <div className="logo-container">


        


          {/* <img src={BannerimageUrl} alt="Client Logo" className="client-logo" /> */}

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

    
    <div className="client-gallery-container" >



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

        
        {/* <div className="client-gallery-item">
        <img src="/about/clientes/10.png" alt="Cliente 1" className="client-photo" />
        </div> */}

        
        {/* <div className="client-gallery-item">
        <img src="/about/clientes/11.png" alt="Cliente 1" className="client-photo" />
        </div> */}

        
        <div className="client-gallery-item">
        <img src="/about/clientes/12.png" alt="Cliente 1" className="client-photo" />
        </div>

        
        <div className="client-gallery-item">
        <img src="/about/clientes/13.png" alt="Cliente 1" className="client-photo" />
        </div>

        <div className="client-gallery-item">
        <img src="/about/clientes/14.png" alt="Post Malone" className="client-photo" />
        </div>


    </div>
    <p className="client-detail">and many more clients.</p>

    </>
  );
};