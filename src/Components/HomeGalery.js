import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/HomeGalery.css';
import '../styles/Main/HomePageFilter.css';

const Gallery = ({ projetos }) => {
  const [filtroCategoria, setFiltroCategoria] = useState('Todos');
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const handleFilterClick = categoria => {
    setFiltroCategoria(categoria);
    setCategoriaAtiva(categoria);
  };

  const categorias = ['Todos', ...new Set(projetos.map(projeto => projeto.categoria))];
  const filtrarProjetos = filtroCategoria === 'Todos' ? projetos : projetos.filter(projeto => projeto.categoria === filtroCategoria);

  function createSlug(name) {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  }

  return (
    <>
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
      
      <div className="gallery-container">
        <TransitionGroup className="gallery">
          {filtrarProjetos.map(projeto => (
            <CSSTransition key={projeto.id} timeout={600} classNames="fade">
            <Link to={`/projetos/${projeto.slug}`}>{projeto.nome} className="gallery-item"
                {projeto.featuredImage ? (
                  <img src={projeto.featuredImage} alt={projeto.nome} className="gallery-item-img" />
                ) : (
                  <div className="gallery-item-skeleton">Carregando...</div>
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
