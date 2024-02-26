import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/Home/HomeGalery.css';



class Gallery extends React.Component {





  
  filtrarProjetos = () => {
    const { projetos, filtroCategoria } = this.props;
        if (filtroCategoria === 'All') {
      return projetos;
    }
   return projetos.filter(projeto => projeto.categoria === filtroCategoria);
  };

  render() {
    const projetosFiltrados = this.filtrarProjetos();

    return (
      <div className="gallery-container">
        <TransitionGroup className="gallery">
          {projetosFiltrados.map(projeto => (
            <CSSTransition key={projeto.id} timeout={600} classNames="fade">
              <div className="project-container"> {/* Envolver os elementos em um novo div */}
                <Link to={`/projetos/${projeto.slug}`} className="gallery-item">
                  {projeto.featuredImage ? (
                    <img src={projeto.featuredImage} alt={projeto.nome} loading="lazy" className="gallery-item-img" />
                  ) : (
                    <div className="gallery-item-skeleton">Loading...</div>
                  )}
                  <div className="gallery-item-title">{projeto.nome}</div>
                  <div className="gallery-item-category">{projeto.categoria}</div>
                </Link>
                {/* Adicionando os elementos fora do Link mas ainda dentro do CSSTransition */}
                <div className="mobile-title">{projeto.nome}</div>
                <div className="mobile-category">{projeto.categoria}</div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    );
    
  }
}

export default Gallery;



// const FeaturedMediaGallery = ({ projetos }) => {
//   const renderFeaturedMedia = (featuredMedia, index) => {
//     // Primeiro, verifique se featuredMedia e featuredMedia.url estão definidos
//     if (!featuredMedia || typeof featuredMedia.url !== 'string') {
//       console.log(`featuredMedia or featuredMedia.url is undefined or not a string at index ${index}`);
//       return <p>Media not available</p>;
//     }

//     // Agora, verifique se a URL termina com '.mp4' para renderizar um vídeo
//     if (featuredMedia.url.endsWith('.mp4')) {
//       return (
//         <video key={index} loop autoPlay muted playsInline style={{ width: '100%', height: 'auto' }}>
//           <source src={featuredMedia.url} type="video/mp4" />
//           Seu navegador não suporta vídeos.
//         </video>
//       );
//     } 
//     // Caso contrário, assuma que é uma imagem
//     else {
//       return <img key={index} src={featuredMedia.url} alt={`Featured Media ${index}`} style={{ width: '100%', height: 'auto' }} />;
//     }
//   };

//   return (
//     <div className="featured-media-gallery">
//       {projetos.map((projeto, index) => (
//         <div key={index} className="featured-media-item">
//           {renderFeaturedMedia(projeto.featuredMedia, index)}
//         </div>
//       ))}
//     </div>
//   );
// };
