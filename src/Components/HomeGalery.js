import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/Home/HomeGalery.css';



class Gallery extends React.Component {
  // Método para filtrar projetos com base na categoria
  filtrarProjetos = () => {
    const { projetos, filtroCategoria } = this.props;
    
    // Se 'All' for selecionado, ou nenhum filtro estiver ativo, retorna todos os projetos
    if (filtroCategoria === 'All') {
      return projetos;
    }

    // Caso contrário, filtra projetos que correspondem à categoria selecionada
    return projetos.filter(projeto => projeto.categoria === filtroCategoria);
  };

  render() {
    // Projetos filtrados para renderização
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