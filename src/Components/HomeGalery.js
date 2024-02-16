import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import '../styles/Main/HomeGalery.css';
import '../styles/Main/HomePageFilter.css';


const Gallery = ({ projetos }) => {
  
  
  const LoadingSpinner = () => {
    return <div className="spinner"></div>;
  };
  
    // const [filtroCategoria, setFiltroCategoria] = useState('All');
    // const [categoriaAtiva, setCategoriaAtiva] = useState('All');

    // const handleFilterClick = categoria => {
    //     setFiltroCategoria(categoria);
    //     setCategoriaAtiva(categoria);
    //   };



  // const categorias = ['All', ...new Set(projetos.map(projeto => projeto.categoria))];

  // const filtrarProjetos = filtroCategoria === 'All' ? projetos : projetos.filter(projeto => projeto.categoria === filtroCategoria);

  return (
    <>
      
      <div className="gallery-container">
        
        <TransitionGroup className="gallery">
          {projetos.map(projeto => (
            <>
            <CSSTransition
              key={projeto.id}
              timeout={600}
              classNames="fade"
            >
              <Link to={`/projetos/${projeto.slug}`} className="gallery-item">
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
            
            <div className="mobile-title">{projeto.nome}</div>
                <div className="mobile-category">{projeto.categoria}</div>
            </>
            
          ))}
        </TransitionGroup>

      </div>
     
    </>
  );
};

export default Gallery;