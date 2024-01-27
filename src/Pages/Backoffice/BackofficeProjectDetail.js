import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config';

const BackOfficeProjectDetail = () => {
  const { projectId } = useParams(); // Obtém o ID do projeto da URL
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjeto = async () => {
      setLoading(true);
      try {
        const docRef = doc(projectFirestore, 'projetos', projectId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProjeto({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('Nenhum projeto encontrado com esse ID!');
        }
      } catch (error) {
        console.error('Erro ao buscar projeto:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjeto();
  }, [projectId]);

  if (loading) {
    return <div>Carregando detalhes do projeto...</div>;
  }

  if (!projeto) {
    return <div>Projeto não encontrado.</div>;
  }

  return (
    <div className="project-detail-page">
      <h2>{projeto.nome}</h2>
      <p>{projeto.descricao}</p>
      {/* Exemplo de como exibir uma imagem, se disponível */}
      {projeto.featuredImage && (
        <img src={projeto.featuredImage} alt={`Imagem de ${projeto.nome}`} />
      )}
      {/* Adicione mais elementos conforme necessário para exibir os detalhes do projeto */}
    </div>
  );
};

export default BackOfficeProjectDetail;
