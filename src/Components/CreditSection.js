// CreditSection.js

import React from 'react';
import '../styles/Main/CreditSection.css'; // Caminho para o seu arquivo CSS

const CreditSection = ({ nomeProjeto, autor, categoria }) => {
  return (
    <div className="credit-section">
      <h1 className="credit-title">{nomeProjeto}</h1>
      <p className="credit-category">{categoria}</p>
      <p className="credit-author">{autor}</p>
      {/* Outros detalhes que você deseja adicionar podem vir aqui */}
    </div>
  );
};

export default CreditSection;
