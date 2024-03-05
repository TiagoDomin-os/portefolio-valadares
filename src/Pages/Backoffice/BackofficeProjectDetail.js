import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Adicione a importação para referenciar e deletar objetos no Firebase Storage
import { projectFirestore, projectStorage } from '../../firebase/config';
import BackofficeNavbar from '../../Components/Navbars/BackofficeNavbar';

const BackofficeProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({
    nome: '',
    autores: [''],
    categoria: '',
    featuredMedia: null,
    galeria: [],
    youtubeLinks: [],
    mp4Videos: [], 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // Para rastrear o progresso de upload

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setIsSubmitting(true);
      const docRef = doc(projectFirestore, 'projetos', projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProject(docSnap.data());
      } else {
        alert('Projeto não encontrado!');
        navigate('/backoffice');
      }
      setIsSubmitting(false);
    };

    fetchProject();
  }, [projectId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prevState => ({ ...prevState, [name]: value }));
  };

  const handleArrayChange = (e, index, field) => {
    const updatedArray = [...project[field]];
    updatedArray[index] = e.target.value;
    setProject(prevState => ({ ...prevState, [field]: updatedArray }));
  };

  const addArrayItem = (field, value = '') => {
    setProject(prevState => ({ ...prevState, [field]: [...prevState[field], value] }));
  };

  const removeArrayItem = (index, field) => {
    const updatedArray = project[field].filter((_, i) => i !== index);
    setProject(prevState => ({ ...prevState, [field]: updatedArray }));
  };

  const handleMediaUpload = (e, field) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      // Determinar o caminho de armazenamento com base no tipo de mídia
      const mediaType = file.type.split('/')[0]; // 'image' ou 'video'
      let storagePath = '';
      if (mediaType === 'image') {
        storagePath = `images/${file.name}`;
      } else if (mediaType === 'video') {
        storagePath = `videos/${file.name}`;
      }
  
      const storageRef = ref(projectStorage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          setErrorMessage('Falha no upload: ' + error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // Atualizar o estado com a URL do arquivo carregado
            setProject(prevState => ({
              ...prevState,
              [field]: [...prevState[field], downloadURL]
            }));
          });
        }
      );
    });
  };
  

  const removeMediaItem = async (index, field, isURL = false) => {
    const updatedArray = project[field].filter((_, i) => i !== index);
    setProject(prevState => ({ ...prevState, [field]: updatedArray }));

    if (isURL) {
      // Remova o arquivo do Firebase Storage se for uma URL
      const fileRef = ref(projectStorage, project[field][index]);
      await deleteObject(fileRef);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await updateDoc(doc(projectFirestore, 'projetos', projectId), project);
      setSuccessMessage('Projeto atualizado com sucesso!');
      setTimeout(() => navigate('/backoffice'), 2000);
    } catch (error) {
      setErrorMessage(`Erro ao atualizar o projeto: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };




  const renderMediaPreview = (media) => {
    if (!media) return null;
  
    const isImage = typeof media === 'string' ? media.match(/\.(jpeg|jpg|gif|png)$/) != null : media.type.startsWith('image/');
    const isVideo = typeof media === 'string' ? media.match(/\.(mp4|webm)$/) != null : media.type.startsWith('video/');
  
    if (isImage) {
      const imageUrl = typeof media === 'string' ? media : URL.createObjectURL(media);
      return <img src={imageUrl} alt="Imagem" style={{ maxWidth: '100px', maxHeight: '100px' }} />;
    } else if (isVideo) {
      const videoUrl = typeof media === 'string' ? media : URL.createObjectURL(media);
      return <video src={videoUrl} alt="Vídeo" style={{ maxWidth: '100px', maxHeight: '100px' }} controls />;
    }
  };
  

  return (
    <>
      <BackofficeNavbar />
      <div className="container mt-5">
        <h2>Editar Projeto</h2>
        <form onSubmit={handleUpdateProject}>
          <div className="mb-3">
            <label htmlFor="nome" className="form-label">Nome do Projeto</label>
            <input type="text" className="form-control" id="nome" name="nome" value={project.nome} onChange={handleChange} />
          </div>

          {project.autores.map((autor, index) => (
            <div key={index} className="mb-3">
              <label htmlFor={`autor-${index}`} className="form-label">Autor {index + 1}</label>
              <div className="input-group">
                <input type="text" className="form-control" value={autor} onChange={(e) => handleArrayChange(e, index, 'autores')} />
                <button type="button" className="btn btn-danger" onClick={() => removeArrayItem(index, 'autores')}>Remover</button>
              </div>
            </div>
          ))}
          <div className="mb-3">
            <button type="button" className="btn btn-secondary" onClick={() => addArrayItem('autores')}>Adicionar Autor</button>
          </div>

          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">Categoria</label>
            <select className="form-control" id="categoria" name="categoria" value={project.categoria} onChange={handleChange}>
              <option value="">Selecione uma Categoria</option>
              <option value="CORPORATE">Corporate</option>
              <option value="AFTERMOVIE">AfterMovie</option>
              <option value="COMMERCIAL">Commercial</option>
              {/* Adicione outras opções de categorias conforme necessário */}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="featuredMedia" className="form-label">Mídia em Destaque</label>
            <input type="file" className="form-control" id="featuredMedia" onChange={(e) => handleMediaUpload(e, 'featuredMedia')} />
            <div className="mt-2">{renderMediaPreview(project.featuredMedia)}</div>
            {project.featuredMedia && (
              <button type="button" className="btn btn-danger mt-2" onClick={() => removeMediaItem(null, 'featuredMedia', typeof project.featuredMedia === 'string')}>Remover Mídia</button>
            )}
          </div>



            {/* Galeria de Imagens */}
            <div className="mb-3">
              <label className="form-label">Galeria de Imagens</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={(e) => handleMediaUpload(e, 'galeria')}
              />
              <div className="mt-2">
                {project.galeria.map((img, index) => (
                  <div key={index} className="d-flex align-items-center mb-2">
                    <div className="me-2">{typeof img === 'string' ? img : img.name}</div>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeMediaItem(index, 'galeria', typeof img === 'string')}
                    >
                      Remover
                    </button>
                  </div>
                ))}
              </div>
            </div>

          {/* Seção de Vídeos */}
<div className="mb-3">
  <label className="form-label">Vídeos em Destaque (.mp4)</label>
  <input
    type="file"
    className="form-control"
    multiple
    accept=".mp4"
    onChange={(e) => handleMediaUpload(e, 'mp4Videos')}
  />
  <div className="mt-2">
    {project.mp4Videos.map((videoUrl, index) => (
      <div key={index} className="d-flex flex-column align-items-center mb-2">
        {typeof videoUrl === 'string' && (
          <video 
            src={videoUrl} 
            controls 
            style={{ maxWidth: '300px', maxHeight: '300px' }} 
          >
            Seu navegador não suporta a tag de vídeo.
          </video>
        )}
        <div className="mt-2">{typeof videoUrl === 'string' ? videoUrl : videoUrl.name}</div>
        <button
          type="button"
          className="btn btn-danger mt-2"
          onClick={() => removeMediaItem(index, 'mp4Videos', typeof videoUrl === 'string')}
        >
          Remover
        </button>
      </div>
    ))}
  </div>
</div>

            {/* Botão de Submissão com Progresso */}
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? `Salvando... ${uploadProgress.toFixed(0)}%` : 'Salvar Alterações'}
        </button>

        {/* Mensagens de Sucesso ou Erro */}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
          </form>
        )
      </div>
    </>
  );
};

export default BackofficeProjectDetails;
