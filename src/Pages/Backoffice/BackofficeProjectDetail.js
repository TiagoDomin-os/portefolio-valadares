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
  const [autor, setAutor] = useState('');
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

  const handleUpdateProject = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = newFeaturedImage ? await fileUploader.uploadFile(newFeaturedImage, 'featuredImages', setUploadProgress) : existingData.featuredImage;
      const newGalleryFiles = galeria.filter(item => item instanceof File);
      const newGalleryUrls = await Promise.all(newGalleryFiles.map(file => fileUploader.uploadFile(file, 'gallery', setUploadProgress)));
      const allGalleryUrls = existingData.galeria ? [...existingData.galeria, ...newGalleryUrls] : [...newGalleryUrls];

      const updatedProject = {
        nome,
        autor,
        categoria,
        featuredImage: imageUrl,
        youtubeLinks,
        galeria: allGalleryUrls.length > 0 ? allGalleryUrls : [], // Usa array vazio como fallback
      };

      await updateDoc(doc(projectFirestore, 'projetos', projectId), updatedProject);
      alert('Projeto atualizado com sucesso!');
      setGaleria(allGalleryUrls); // Atualiza o estado com a nova lista de URLs
      setNewFeaturedImage(null);
      setIsSubmitting(false);
    } catch (error) {
      alert(`Erro ao atualizar projeto: ${error.message}`);
      console.error("Erro ao atualizar projeto: ", error);
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
 <button type="button" className="btn btn-danger ml-2" onClick={() => removeGalleryItem(index)}>
   Remover
 </button>
</div>
))}
            </div>
  
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              Salvar Alterações
            </button>
            {isSubmitting && (
  <div>
    <p>Carregando: {uploadProgress.toFixed(0)}%</p>
    <div style={{ width: '100%', backgroundColor: '#e0e0e0' }}>
      <div style={{ height: '24px', width: `${uploadProgress}%`, backgroundColor: '#4caf50' }}></div>
    </div>
  </div>
)}
          </form>
        )}
      </div>
    </>
  );
  

};

export default BackofficeProjectDetails;

