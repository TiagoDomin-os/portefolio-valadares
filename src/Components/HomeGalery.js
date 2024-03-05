import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/Home/HomeGalery.css';

class Gallery extends React.Component {

//   renderMedia(mediaUrl, index) {
//     // if (!mediaUrl) return <div className="gallery-item-skeleton">Loading...</div>;

//     if (mediaUrl.endsWith('.mp4')) {
//       return (
//         <div className="thumbnail-video" key={index}>
//         <video loop autoPlay muted playsInline style={{ width: '100%', height: 'auto' }}>
//   <source src={mediaUrl} type="video/mp4" />
//   Seu navegador não suporta vídeos.
// </video>
//         </div>
//       );
//     } else {
//       return <img src={mediaUrl} alt={`Featured Media ${index}`} className="gallery-item-img" />;
//     }
//   }
  
  
renderMedia(mediaUrl, index) {
  // Extrai a parte do URL antes dos parâmetros de query
  const urlBeforeParams = mediaUrl.split('?')[0];

  // Verifica se a parte do URL antes dos parâmetros de query contém '.mp4'
  if (urlBeforeParams.includes('.mp4')) {
    // Renderiza o vídeo se o URL é uma string e contém '.mp4'
    return (
      <div key={index} className="thumbnail-video ">
         <video 
        src={mediaUrl} 
        autoPlay 
        loop 
        muted // Necessário para permitir autoplay em alguns navegadores
        playsInline // Evita a reprodução em tela cheia em dispositivos móveis
        style={{ width: '100%', height: 'auto' }}
      >
        Seu navegador não suporta a tag de vídeo.
      </video>
        {/* Exibe o link do vídeo abaixo dele */}
        <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="media-link mt-2">Ver vídeo</a>
      </div>
    );
  } else {
    // Para imagens, retorna a imagem e o link abaixo dela
    return (
      <div className="thumbnail-image" key={index}>
        <img src={mediaUrl} alt={`Featured Media ${index}`} className="gallery-item-img" />
        {/* Exibe o link da imagem abaixo dela */}
        <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="media-link">Ver imagem</a>
      </div>
    );
  }
}




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
          {projetosFiltrados.map((projeto, index) => (
            <CSSTransition key={projeto.id} >
              <div className="project-container">
                <Link to={`/projetos/${projeto.slug}`} className="gallery-item">
                  {this.renderMedia(projeto.featuredMedia, index)}
                  
                  <div className="gallery-item-title">{projeto.nome}</div>
                  <div className="gallery-item-category">{projeto.categoria}</div>
                </Link>
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
