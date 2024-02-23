// CreditSection.js

import React from 'react';
import '../styles/Main/ProjectDetail/CreditSection.css'; // Caminho para o seu arquivo CSS

const CreditSection = ({ nomeProjeto, autores, categoria }) => {
  return (
    <div className="credit-section">
      <h1 className="credit-title">{nomeProjeto}</h1>
      <p className="credit-category">{categoria}</p>
{/* Mapeia o array de autores para uma lista de elementos <p> */}
{autores?.map((autor, index) => (
        <p key={index} className="credit-author">{autor}</p>
      ))}      {/* Outros detalhes que você deseja adicionar podem vir aqui */}
    </div>
  );
};


export default CreditSection;
