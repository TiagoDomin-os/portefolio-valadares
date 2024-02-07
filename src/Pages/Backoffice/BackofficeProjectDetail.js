import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { projectFirestore, projectStorage } from '../../firebase/config';
import FileUploader from '../Backoffice/AddProjectPage/fileUploaded';
import BackofficeNavbar from '../../Components/BackofficeNavbar';
import { ref, deleteObject } from "firebase/storage";

const fileUploader = new FileUploader(projectStorage);

const BackofficeProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [autores, setAutores] = useState(['']); // autores deve ser um array para suportar múltiplos autores
  const [categoria, setCategoria] = useState('');
  const [newFeaturedImage, setNewFeaturedImage] = useState(null);
  const [youtubeLinks, setYoutubeLinks] = useState([]);
  const [galeria, setGaleria] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [existingData, setExistingData] = useState({});

  useEffect(() => {
    const fetchProject = async () => {
      setIsSubmitting(true);
      const docRef = doc(projectFirestore, 'projetos', projectId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setExistingData(data);
        setNome(data.nome);
        setAutores(data.autores || ['']); // Definindo autores como array
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


  
  const handleAutorChange = (index, value) => {
    const updatedAutores = [...autores];
    updatedAutores[index] = value;
    setAutores(updatedAutores);
  };

  const addAutorInput = () => {
    setAutores([...autores, '']);
  };

  const removeAutorInput = (index) => {
    const filteredAutores = autores.filter((_, i) => i !== index);
    setAutores(filteredAutores);
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = newFeaturedImage ? await fileUploader.uploadFile(newFeaturedImage, 'featuredImages', setUploadProgress) : existingData.featuredImage;
     
      const newGalleryUrls = await Promise.all(galeria.map(file => 
        file instanceof File ? fileUploader.uploadFile(file, 'gallery', setUploadProgress) : Promise.resolve(file)
      ));


      const autoresList = autores.filter(autor => autor.trim() !== '');

      const updatedProject = {
        nome,
        autores: autoresList, // Atualizar para usar a lista de autores
        categoria,
        featuredImage: imageUrl,
        youtubeLinks,
        galeria: newGalleryUrls
      };

      await updateDoc(doc(projectFirestore, 'projetos', projectId), updatedProject);
      alert('Projeto atualizado com sucesso!');
      navigate('/backoffice');
    } catch (error) {
      alert(`Erro ao atualizar projeto: ${error.message}`);
      console.error("Erro ao atualizar projeto: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setNewFeaturedImage(e.target.files[0]);
    }
  };

  const handleGalleryChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setGaleria([...galeria, ...newFiles]);
  };



  const addYoutubeLinkInput = () => {    setYoutubeLinks([...youtubeLinks, '']);  };

  const handleYoutubeLinkChange = (index, value) => {
    const updatedLinks = [...youtubeLinks];
    updatedLinks[index] = value;
    setYoutubeLinks(updatedLinks);
  };

  const removeYoutubeLinkInput = (index) => {
    const updatedLinks = youtubeLinks.filter((_, idx) => idx !== index);
    setYoutubeLinks(updatedLinks);
  };

  

  const removeGalleryItem = async (index) => {
    const itemToRemove = galeria[index];
  
    // Verifica se o item é um arquivo (não enviado ainda) ou um URL (já enviado)
    if (typeof itemToRemove === "string") {
      // Construa a referência ao arquivo no Firebase Storage
      const fileRef = ref(projectStorage, itemToRemove);
  
      try {
        // Tenta deletar o arquivo do Storage
        await deleteObject(fileRef);
        console.log("Arquivo removido do Storage:", itemToRemove);
  
        // Remove o item do array no Firestore também
        const updatedGaleria = existingData.galeria.filter((_, idx) => idx !== index);
        await updateDoc(doc(projectFirestore, 'projetos', projectId), { galeria: updatedGaleria });
      } catch (error) {
        console.error("Erro ao remover arquivo do Storage:", error);
      }
    } else {
      // É um arquivo local, apenas remove do estado local
      const updatedGaleria = galeria.filter((_, idx) => idx !== index);
      setGaleria(updatedGaleria);
    }
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
            {/* Nome do Projeto */}
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Projeto</label>
              <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            {/* Autores */}
            {autores.map((autor, index) => (
              <div key={index} className="mb-3 d-flex">
                <input
                  type="text"
                  className="form-control"
                  value={autor}
                  onChange={(e) => handleAutorChange(e, index)}
                  placeholder="Nome do Autor"
                />
                <button type="button" className="btn btn-danger ml-2" onClick={() => removeAutorInput(index)}>
                  Remover
                </button>
              </div>
            ))}
            <button type="button" className="btn btn-secondary mb-3" onClick={addAutorInput}>
              Adicionar Autor
            </button>

            {/* Categoria */}
            <div className="mb-3">
              <label htmlFor="categoria" className="form-label">Categoria</label>
              <select className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                <option value="">Selecione uma Categoria</option>
                <option value="Corporate">Corporate</option>
                <option value="After Movie">After Movie</option>
                <option value="Commercial">Commercial</option>
                {/* Adicione mais opções de categoria conforme necessário */}
              </select>
            </div>

            {/* Imagem em Destaque */}
            <div className="mb-3">
              <label htmlFor="featuredImage" className="form-label">Imagem em Destaque</label>
              <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
              {existingData.featuredImage && (
                <div className="mt-2">
                  <img src={existingData.featuredImage} alt="Imagem em destaque atual" style={{ maxWidth: '200px' }} />
                </div>
              )}
            </div>

            {/* Links do YouTube */}
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
            <div className="mt-2">
              {galeria.map((image, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  {/* Exibição das imagens */}
                  {/* ... */}
                  <button type="button" className="btn btn-danger ml-2" onClick={() => removeGalleryItem(index)}>
                    Remover
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Indicador de Progresso de Upload, colocado fora do loop da galeria */}
          {isSubmitting && (
            <div className="progress mt-3">
              <div className="progress-bar" role="progressbar" style={{ width: `${uploadProgress}%` }} aria-valuenow={uploadProgress} aria-valuemin="0" aria-valuemax="100">
                {uploadProgress.toFixed(0)}%
              </div>
            </div>
          )}

          {/* Botão para salvar as alterações */}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            Salvar Alterações
          </button>
        </form>
      )}
    </div>
  </>
);
          }

export default BackofficeProjectDetails;
