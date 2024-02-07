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
  const [autores, setAutores] = useState(['']);
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
        setAutores(data.autores || ['']);
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

  const handleAutorChange = (index, newValue) => {
    const updatedAutores = [...autores];
    updatedAutores[index] = newValue;
    setAutores(updatedAutores);
  };
  

  const addAutorInput = () => {
    setAutores([...autores, '']);
  };

  const removeAutorInput = (index) => {
    const filteredAutores = autores.filter((_, i) => i !== index);
    setAutores(filteredAutores);
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

  const handleYoutubeLinkChange = (index, value) => {
    const updatedLinks = [...youtubeLinks];
    updatedLinks[index] = value;
    setYoutubeLinks(updatedLinks);
  };

  const addYoutubeLinkInput = () => {
    setYoutubeLinks([...youtubeLinks, '']);
  };

  const removeYoutubeLinkInput = (index) => {
    const updatedLinks = youtubeLinks.filter((_, idx) => idx !== index);
    setYoutubeLinks(updatedLinks);
  };

  const removeGalleryItem = async (index) => {
    const itemToRemove = galeria[index];
    if (typeof itemToRemove === "string") {
      const fileRef = ref(projectStorage, itemToRemove);
      try {
        await deleteObject(fileRef);
        const updatedGaleria = existingData.galeria.filter((_, idx) => idx !== index);
        await updateDoc(doc(projectFirestore, 'projetos', projectId), { galeria: updatedGaleria });
      } catch (error) {
        console.error("Erro ao remover arquivo do Storage:", error);
      }
    } else {
      const updatedGaleria = galeria.filter((_, idx) => idx !== index);
      setGaleria(updatedGaleria);
    }
  };

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let imageUrl = existingData.featuredImage;
      if (newFeaturedImage) {
        const uploadResult = await fileUploader.uploadFile(newFeaturedImage, 'featuredImages', setUploadProgress);
        if (uploadResult) {
          imageUrl = uploadResult;
        } else {
          // Se o upload falhar, mantém a imagem existente ou define uma fallback
          imageUrl = existingData.featuredImage || 'URL_DA_IMAGEM_PADRAO';
        }
      }

      const autoresList = autores.filter(autor => autor.trim() !== '');


      const newGalleryUrls = await Promise.all(galeria.map(file =>
        !(file instanceof File) ? file : fileUploader.uploadFile(file, 'gallery', (progress) => setUploadProgress(progress))
      ));

      const updatedProject = {
        nome,
        autores,
        categoria,
        featuredImage: imageUrl,
        youtubeLinks,
        galeria: newGalleryUrls.filter(url => url !== undefined) // Filtra URLs indefinidas
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

  return (
    <>
      <BackofficeNavbar />
      <div className="container mt-5">
        <h2>Editar Projeto</h2>
        {isSubmitting ? <p>Atualizando projeto...</p> : (
          <form onSubmit={handleUpdateProject} className="mb-3">
 {/* Nome do Projeto */}
 <div className="mb-3">
              <label htmlFor="nome" className="form-label">Nome do Projeto</label>
              <input type="text" className="form-control" id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            {/* Autores */}
            <label htmlFor="nome" className="form-label">Autores</label>

            {autores.map((autor, index) => (
  <div key={index} className="mb-3 d-flex">
    <input
      type="text"
      className="form-control"
      value={autor}
      onChange={(e) => handleAutorChange(index, e.target.value)}
      placeholder="Nome do Autor"
    />
    <button type="button" className="btn btn-danger ml-2" onClick={() => removeAutorInput(index)}>
      Remover
    </button>
  </div>
))}
<button type="button" className="btn btn-secondary" onClick={addAutorInput}>Adicionar Autor</button>



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

           {/* {/* Imagem em Destaque }
            <div className="mb-3">
              <label htmlFor="featuredImage" className="form-label">Imagem em Destaque</label>
              <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
              {existingData.featuredImage && (
                <div className="mt-2">
                  <img src={existingData.featuredImage} alt="Imagem em destaque atual" style={{ maxWidth: '200px' }} />
                </div>
              )}
            </div>*/}

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

         {/*   <div className="mb-3">
  <label htmlFor="galeria" className="form-label">Galeria de Imagens</label>
  <input type="file" className="form-control" id="galeria" multiple onChange={handleGalleryChange} />
  <div className="mt-2">
    {existingData.galeria && existingData.galeria.map((url, index) => (
      <div key={index} className="d-flex align-items-center mb-2">
        <img src={url} alt={`Imagem ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        <button type="button" className="btn btn-danger ml-2" onClick={() => removeGalleryItem(url, 'existing')}>
          Remover
        </button>
      </div>
    ))}
    {galeria.filter(file => file instanceof File).map((file, index) => (
      <div key={`new-${index}`} className="d-flex align-items-center mb-2">
        <img src={URL.createObjectURL(file)} alt={`Nova imagem ${index}`} style={{ maxWidth: '100px', maxHeight: '100px' }} onLoad={() => URL.revokeObjectURL(file)} />
        <button type="button" className="btn btn-danger ml-2" onClick={() => removeGalleryItem(index, 'new')}>
          Remover
        </button>
      </div>
    ))}
  </div>
  </div> */}

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
          </button>          </form>
        )}
      </div>
    </>
  );
};

export default BackofficeProjectDetails;
