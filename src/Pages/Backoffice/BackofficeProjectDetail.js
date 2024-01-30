import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore, projectStorage } from '../../firebase/config';
import FileUploader from '../Backoffice/AddProjectPage/fileUploaded'; // Ajuste o caminho conforme necessário
import BackofficeNavbar from '../../Components/BackofficeNavbar';

import 'bootstrap/dist/css/bootstrap.min.css';

const fileUploader = new FileUploader(projectStorage);

const BackofficeProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [newFeaturedImage, setNewFeaturedImage] = useState(null);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const fetchProject = async () => {
      setIsSubmitting(true);
      const docRef = doc(projectFirestore, 'projetos', projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setNome(data.nome);
        setAutor(data.autor);
        setCategoria(data.categoria);
        setYoutubeLinks(data.youtubeLinks || []);
        setGaleria(data.galeria || []);
      } else {
        alert('Projeto não encontrado!');
        navigate('/backoffice');
      }
      setIsSubmitting(false);
    };
    fetchProject();
  }, [projectId, navigate]);










  









 const handleUpdateProject = async () => {
    setIsSubmitting(true);

    const updateImageUrl = async () => {
        return new Promise((resolve, reject) => {
            if (newFeaturedImage) {
                fileUploader.uploadFile(
                    newFeaturedImage, 
                    'featuredImages',
                    (progress) => setUploadProgress(progress),
                    (error) => {
                        console.error("Erro ao fazer upload da imagem em destaque:", error);
                        reject(error);
                    },
                    (downloadURL) => resolve(downloadURL)
                );
            } else {
                resolve(null); // Se não houver uma nova imagem em destaque para upload, resolve a Promise com null
            }
        });
    };

    try {
        const imageUrl = await updateImageUrl();

        let galleryUrls = [];
        // A lógica para upload das imagens da galeria seria similar à da imagem em destaque

        const updatedProject = {
            nome,
            autor,
            categoria,
            featuredImage: imageUrl, // Use a nova URL da imagem em destaque, se houver
            // Inclua outras propriedades necessárias, como youtubeLinks e galeria
        };

        await updateDoc(doc(projectFirestore, 'projetos', projectId), updatedProject);

        alert('Projeto atualizado com sucesso!');
        navigate('/backoffice');
    } catch (error) {
        console.error("Erro ao atualizar projeto: ", error);
    } finally {
        setIsSubmitting(false);
        setUploadProgress(0); // Reset do progresso após o término do upload
    }
};





const handleImageChange = (e) => {
  if (e.target.files[0]) {
    setNewFeaturedImage(e.target.files[0]); // Corrigido para usar setNewFeaturedImage
  }
};




  const handleGalleryChange = (e) => {
    const files = e.target.files;
    if (files) {
      setGaleria([...galeria, ...files]);
    }
  };

  const addYoutubeLinkInput = () => {
    setYoutubeLinks([...youtubeLinks, '']);
  };

  const handleYoutubeLinkChange = (index, value) => {
    const updatedLinks = [...youtubeLinks];
    updatedLinks[index] = value;
    setYoutubeLinks(updatedLinks);
  };

  const removeYoutubeLinkInput = (index) => {
    const updatedLinks = youtubeLinks.filter((_, idx) => idx !== index);
    setYoutubeLinks(updatedLinks);
  };

  const removeGalleryImage = (index) => {
    const updatedGallery = galeria.filter((_, idx) => idx !== index);
    setGaleria(updatedGallery);
  };











  return (
    <>
      <BackofficeNavbar />
      <div className="container mt-5">
        <h2>Editar Projeto</h2>
        {isSubmitting ? (
          <p>Atualizando projeto...</p>
        ) : (
          <form onSubmit={handleUpdateProject} className="mb-3">
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Projeto</label>
              <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
  
            <div className="mb-3">
              <label htmlFor="autor" className="form-label">Autor</label>
              <input type="text" className="form-control" id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
            </div>
  
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria</label>
              <select className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">Selecione uma Categoria</option>
                <option value="Corporate">Corporate</option>
                <option value="After Movie">After Movie</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>
  
            <div className="mb-3">
              <label htmlFor="featuredImage" className="form-label">Imagem em Destaque</label>
              <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
            </div>
  
            <div className="mb-3">
              <label htmlFor="youtubeLinks" className="form-label">Links do YouTube</label>
              {youtubeLinks.map((link, index) => (
                <div key={index} className="d-flex mb-2">
                  <input
                    type="text"
                    className="form-control"
                    value={link}
                    onChange={(e) => handleYoutubeLinkChange(index, e.target.value)}
                    placeholder="Insira o link do YouTube"
                  />
                  <button type="button" className="btn btn-danger ml-2" onClick={() => removeYoutubeLinkInput(index)}>
                    Remover
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-secondary" onClick={addYoutubeLinkInput}>
                Adicionar Link do YouTube
              </button>
            </div>
  
            <div className="mb-3">
              <label htmlFor="galeria" className="form-label">Galeria de Imagens</label>
              <input type="file" className="form-control" id="galeria" multiple onChange={handleGalleryChange} />
              {galeria.map((image, index) => (
  <div key={index} className="d-flex align-items-center mb-2">
    {image instanceof File ? (
      <img src={URL.createObjectURL(image)} alt={`Galeria ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }}
           onLoad={() => URL.revokeObjectURL(image)} />
    ) : (
      <img src={image} alt={`Galeria ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
    )}
    <button type="button" className="btn btn-danger ml-2" onClick={() => removeGalleryImage(index)}>
      Remover
    </button>
  </div>
))}
            </div>
  
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Salvar Alterações
            </button>
            {isSubmitting && <div>Carregando: {uploadProgress.toFixed(0)}%</div>}

          </form>
        )}
      </div>
    </>
  );
  

};

export default BackofficeProjectDetails;

