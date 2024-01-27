import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore } from '../../firebase/config'; // Certifique-se de que este é o caminho correto para sua configuração do Firestore

const BackofficeProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projeto, setProjeto] = useState(null);
  const [loading, setLoading] = useState(true);
  // Adicionar estados para cada campo editável
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      const docRef = doc(projectFirestore, 'projetos', projectId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setProjeto(data);
        setNome(data.nome);
        setAutor(data.autor);
        setCategoria(data.categoria);
        setFeaturedImage(data.featuredImage);
      } else {
        console.log('Projeto não encontrado!');
      }
      setLoading(false);
    };

    fetchProject();
  }, [projectId]);

  const handleUpdateProject = async () => {
    // Atualiza o documento com as novas informações
    const projectRef = doc(projectFirestore, 'projetos', projectId);
    const updatedProject = { nome, autor, categoria, featuredImage };
    await updateDoc(projectRef, updatedProject);
    alert('Projeto atualizado!');
    navigate('/backoffice'); // Redireciona para a página principal do backoffice
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!projeto) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <div className="project-details-container">
      <h1>Editar Projeto</h1>
      <label>Nome do Projeto:</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <label>Autor:</label>
      <input
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
      />
      <label>Categoria:</label>
      <input
        type="text"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
      <label>Imagem em Destaque:</label>
      <div className="featured-image-container">
        <input
          type="text"
          value={featuredImage}
          onChange={(e) => setFeaturedImage(e.target.value)}
        />
        {featuredImage && (
          <img
            src={featuredImage}
            alt="Imagem em Destaque"
            className="featured-image"
          />
        )}
      </div>
      {/* O campo para adicionar conteúdo à galeria virá aqui */}
      <button onClick={handleUpdateProject}>Salvar Alterações</button>
    </div>
  );
};

export default BackofficeProjectDetails;
