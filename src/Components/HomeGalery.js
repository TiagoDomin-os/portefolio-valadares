import React from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/Home/HomeGalery.css';

class Gallery extends React.Component {

  renderMedia(mediaUrl, index) {
    // if (!mediaUrl) return <div className="gallery-item-skeleton">Loading...</div>;

    if (mediaUrl.endsWith('.mp4')) {
      return (
        <div className="thumbnail-video" key={index}>
        <video loop autoPlay muted playsInline style={{ width: '100%', height: 'auto' }}>
  <source src={mediaUrl} type="video/mp4" />
  Seu navegador não suporta vídeos.
</video>
        </div>
      );
    } else {
      return <img src={mediaUrl} alt={`Featured Media ${index}`} className="gallery-item-img" />;
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
