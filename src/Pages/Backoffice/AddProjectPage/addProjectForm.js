import React, { useState } from 'react';
import { projectStorage, projectFirestore } from '../../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import FileUploader from './fileUploaded'; // Ajuste o caminho conforme necessário
import BackofficeNavbar from '../../../Components/BackofficeNavbar';


import 'bootstrap/dist/css/bootstrap.min.css';


const fileUploader = new FileUploader(projectStorage);

const AddProjectForm = () => {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [galeria, setGaleria] = useState([]);

  const [youtubeLinks, setYoutubeLinks] = useState([]); // Estado para gerenciar os links do YouTube



  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => setFeaturedImage(e.target.files[0]);
  const handleVideoChange = (e) => setFeaturedVideo(e.target.files[0]);
  const handleGalleryChange = (e) => setGaleria([...e.target.files]);


  const handleYoutubeLinkChange = (e, index) => {
    const newYoutubeLinks = [...youtubeLinks];
    newYoutubeLinks[index] = e.target.value;
    setYoutubeLinks(newYoutubeLinks);
  };

  const addYoutubeLinkInput = () => {
    setYoutubeLinks([...youtubeLinks, '']);
  };

  const removeYoutubeLinkInput = (index) => {
    const newYoutubeLinks = youtubeLinks.filter((_, idx) => idx !== index);
    setYoutubeLinks(newYoutubeLinks);
  };





  const handleUpload = async (file, folder) => {
    return new Promise((resolve, reject) => {
      fileUploader.uploadFile(
        file,
        folder,
        (progress) => {
          console.log(`Progresso: ${progress}%`);
          setUploadProgress(progress);
        },
        (error) => reject(error),
        (url) => resolve(url)
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const imageUrl = featuredImage ? await handleUpload(featuredImage, 'featuredImages') : null;
      const videoUrl = featuredVideo ? await handleUpload(featuredVideo, 'featuredVideos') : null;
      const galleryUrls = await Promise.all(galeria.map(file => handleUpload(file, 'gallery')));

      await addDoc(collection(projectFirestore, 'projetos'), {
        nome,
        autor,
        categoria, // Adiciona a categoria ao documento
        featuredImage: imageUrl,
        videoDestacado: videoUrl,
        youtubeLinks,
        galeria: galleryUrls.filter(url => url !== null)
      });

      console.log("Projeto adicionado com sucesso.");
      // Reset dos campos
      setNome('');
      setAutor('');
      setCategoria('');
      setFeaturedImage(null);
      setFeaturedVideo(null);
      setGaleria([]);
      document.getElementById('featuredImage').value = ''; // Reset do campo de imagem destacada
      document.getElementById('featuredVideo').value = ''; // Reset do campo de vídeo destacado
      document.getElementById('galeria').value = ''; // Reset do campo de galeria
    } catch (error) {
      console.error("Erro ao adicionar projeto: ", error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (

    <>

    <BackofficeNavbar />
    <div className="container mt-5">
      <h2>Adicionar Novo Projeto</h2>
      <form onSubmit={handleSubmit} className="mb-3">
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
          <label htmlFor="featuredImage" className="form-label">Imagem Destacada</label>
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
                onChange={(e) => handleYoutubeLinkChange(e, index)}
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
          <label htmlFor="featuredVideo" className="form-label">Vídeo Destacado</label>
          <input type="file" className="form-control" id="featuredVideo" onChange={handleVideoChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="galeria" className="form-label">Galeria de Imagens e Vídeos</label>
          <input type="file" className="form-control" id="galeria" multiple onChange={handleGalleryChange} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? `Carregando: ${uploadProgress.toFixed(0)}%` : 'Adicionar Projeto'}
        </button>
      </form>
    </div>

    </>

  );
};

export default AddProjectForm;
