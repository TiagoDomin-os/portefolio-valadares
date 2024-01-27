import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

import Navbar from '../../Components/Navbar';


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
      <Navbar />
      <div className="project-list-container">
        <h2>Lista de Projetos</h2>
        <ul>
          {projetos.map(projeto => (
            <li key={projeto.id}>
              <Link to={`/backoffice/projetos/${projeto.id}`}>
                {projeto.nome} - {projeto.categoria}
              </Link>
            </li>
          ))}
        </ul>
      </div>    </>
  );
};

export default BackofficeProjectListPage;
