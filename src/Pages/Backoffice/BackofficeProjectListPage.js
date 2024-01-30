import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import BackofficeNavbar from '../../Components/BackofficeNavbar';
import '../../styles/BackOffice/ProjectList.css'; // Caminho do arquivo CSS

const BackofficeProjectListPage = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    const fetchProjetos = async () => {
      const querySnapshot = await getDocs(collection(projectFirestore, 'projetos'));
      const projetosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjetos(projetosData);
    };

    fetchProjetos();
  }, []);

  return (
    <>
      <BackofficeNavbar />
      <div className="project-list-container">
        <h2>Lista de Projetos</h2>
        {projetos.map(projeto => (
          <div className="project-card" key={projeto.id}>
            <div className="project-image">
              {/* Adicione a imagem destacada aqui se disponível */}
            </div>
            <div className="project-details">
              <div className="project-title">{projeto.nome}</div>
              <div className="project-category">{projeto.categoria}</div>
            </div>
            <Link to={`/backoffice/projetos/${projeto.id}`} className="edit-button">
              Editar
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default BackofficeProjectListPage;
