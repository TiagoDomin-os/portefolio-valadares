import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';

const ProjectDetails = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);

  useEffect(() => {
    const fetchProjeto = async () => {
      const docRef = doc(projectFirestore, 'projetos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProjeto({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Nenhum projeto encontrado!");
      }
    };

    fetchProjeto();
  }, [id]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="project-details">
      <h2>{projeto.nome}</h2>

      <div className="gallery-item">
              <img src={projeto.featuredImage} alt={projeto.nome} />
              
            </div>

      <p>{projeto.featuredImage}</p>
      {/* Adicione mais detalhes do projeto conforme necessário */}
    </div>
  );
};

export default ProjectDetails;