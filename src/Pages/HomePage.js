import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src="/path/to/logo.png" alt="Logo" height="30" />
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/add-project">Adicionar Projeto</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="gallery">
        {projetos.map(projeto => (
          <Link key={projeto.id} to={`/projetos/${projeto.id}`}>
            <div className="gallery-item">
              <img src={projeto.featuredImage} alt={projeto.nome} />
              <h3>{projeto.nome}</h3>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default HomePage;
