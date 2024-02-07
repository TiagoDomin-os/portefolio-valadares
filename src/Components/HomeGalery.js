import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/HomeGalery.css';
import '../styles/Main/HomePageFilter.css';


const Gallery = ({ projetos }) => {
  
  
  const LoadingSpinner = () => {
    return <div className="spinner"></div>;
  };
  
    const [filtroCategoria, setFiltroCategoria] = useState('Todos');
    const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

    const handleFilterClick = categoria => {
        setFiltroCategoria(categoria);
        setCategoriaAtiva(categoria);
      };



  const categorias = ['Todos', ...new Set(projetos.map(projeto => projeto.categoria))];

  const filtrarProjetos = filtroCategoria === 'Todos' ? projetos : projetos.filter(projeto => projeto.categoria === filtroCategoria);

  return (
    <>
      {/* Renderizando os botões de filtro */}
      <div className="filter-container">
      {categorias.map((categoria, index) => (
        <button
          key={index}
          onClick={() => handleFilterClick(categoria)}
          className={categoriaAtiva === categoria ? 'filter-btn active' : 'filter-btn'}
        >
          {categoria}
        </button>
      ))}
    </div>
      
      {/* Galeria de projetos com animações */}
      <div className="gallery-container">
        <TransitionGroup className="gallery">
          {filtrarProjetos.map(projeto => (
            <CSSTransition
              key={projeto.id}
              timeout={600}
              classNames="fade"
            >
              <Link to={`/projetos/${projeto.id}`} className="gallery-item">
                {/* Use o spinner ou o esqueleto como fallback */}
                {projeto.featuredImage ? (
                  <img src={projeto.featuredImage} alt={projeto.nome} loading="lazy" className="gallery-item-img" />
                ) : (
                  // Renderize o spinner ou o esqueleto aqui
                  <div className="gallery-item-skeleton">
                    <LoadingSpinner />
                  </div>
                )}
                <div className="gallery-item-title">{projeto.nome}</div>
                <div className="gallery-item-category">{projeto.categoria}</div>
              </Link>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </>
  );
};

export default Gallery;
