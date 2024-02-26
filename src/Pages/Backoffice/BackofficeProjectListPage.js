import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'; // Combine as importações aqui
import { Link } from 'react-router-dom';
import { projectFirestore, projectStorage } from '../../firebase/config';
import { ref, deleteObject } from "firebase/storage";
import BackofficeNavbar from '../../Components/Navbars/BackofficeNavbar';
import '../../styles/BackOffice/ProjectList.css'; // Caminho do arquivo CSS


const BackofficeProjectListPage = () => {
  const [projetos, setProjetos] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); // Estado para forçar recarregamento


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

  const fetchProjetos = async () => {
    const querySnapshot = await getDocs(collection(projectFirestore, 'projetos'));
    const projetosData = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setProjetos(projetosData);
  };

 const deleteProject = async (projectId) => {
  // Referência ao documento do projeto que será excluído
  const projectRef = doc(projectFirestore, 'projetos', projectId);

  // Obter o documento para acessar as URLs dos arquivos
  const projectDoc = await getDoc(projectRef);
  if (!projectDoc.exists()) {
    console.error('Projeto não encontrado!');
    return;
  }
  const projectData = projectDoc.data();

  // Array para armazenar promessas de exclusão de arquivos do Storage
  const fileDeletionPromises = [];

  // Adicionar promessa de exclusão da imagem destacada, se houver
  if (projectData.featuredMedia) {
    const featuredMediaRef = ref(projectStorage, projectData.featuredMedia);
    fileDeletionPromises.push(deleteObject(featuredMediaRef));
  }

  // Adicionar promessas de exclusão para cada arquivo na galeria
  projectData.galeria.forEach((fileUrl) => {
    const fileRef = ref(projectStorage, fileUrl);
    fileDeletionPromises.push(deleteObject(fileRef));
  });


  if (projectData.mp4Videos) {
    projectData.mp4Videos.forEach((videoUrl) => {
      const videoRef = ref(projectStorage, videoUrl);
      fileDeletionPromises.push(deleteObject(videoRef));
    });
  }

  // Aguardar a exclusão de todos os arquivos
  try {
    await Promise.all(fileDeletionPromises);
    console.log('Todos os arquivos foram excluídos com sucesso.');
  } catch (error) {
    console.error('Erro ao excluir arquivos:', error);
    // Decida se quer continuar a excluir o documento Firestore mesmo se a exclusão do arquivo falhar
  }

  // Excluir o documento do Firestore após a exclusão bem-sucedida dos arquivos
  try {
    await deleteDoc(projectRef);
    console.log('Projeto excluído com sucesso do Firestore.');
  } catch (error) {
    console.error('Erro ao excluir projeto do Firestore:', error);
  }
  setRefreshKey(oldKey => oldKey + 1);
  await fetchProjetos();

};

  return (
    <>
      <BackofficeNavbar />
      <div className="project-list-container">
        <h2>Lista de Projetos</h2>
        {projetos.map(projeto => (
          <div className="project-card" key={projeto.id}>
            <div className="project-image">
              {/* Adicione a imagem destacada aqui se disponível */}
              {projeto.featuredMedia && (
                <img src={projeto.featuredMedia} alt="Imagem Destacada" style={{ width: '100%' }} />
              )}
            </div>
            <div className="project-details">
              <div className="project-title">{projeto.nome}</div>
              <div className="project-category">{projeto.categoria}</div>
            </div>
            <div className="project-actions">
              <Link to={`/backoffice/projetos/${projeto.id}`} className="edit-button">
                Editar
              </Link>
              <button onClick={() => deleteProject(projeto.id)} className="edit-button">
                 Excluir
              </button>                
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BackofficeProjectListPage;
