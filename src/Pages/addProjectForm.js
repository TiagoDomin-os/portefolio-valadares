import React, { useState } from 'react';
import { projectStorage, projectFirestore } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import FileUploader from './fileUploaded'; // Ajuste o caminho conforme necessário
import 'bootstrap/dist/css/bootstrap.min.css';

const fileUploader = new FileUploader(projectStorage);

const AddProjectForm = () => {
  const [nome, setNome] = useState('');
  const [autor, setAutor] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [featuredVideo, setFeaturedVideo] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => setFeaturedImage(e.target.files[0]);
  const handleVideoChange = (e) => setFeaturedVideo(e.target.files[0]);
  const handleGalleryChange = (e) => setGaleria([...e.target.files]);

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
        featuredImage: imageUrl,
        videoDestacado: videoUrl,
        galeria: galleryUrls.filter(url => url !== null)
      });

      console.log("Projeto adicionado com sucesso.");
      setNome('');
      setAutor('');
      setFeaturedImage(null);
      setFeaturedVideo(null);
      setGaleria([]);
    } catch (error) {
      console.error("Erro ao adicionar projeto: ", error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Adicionar Novo Projeto</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        {
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
          <label htmlFor="featuredImage" className="form-label">Imagem Destacada</label>
          <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="featuredVideo" className="form-label">Vídeo Destacado</label>
          <input type="file" className="form-control" id="featuredVideo" onChange={handleVideoChange} />
        </div>

        <div className="mb-3">
          <label htmlFor="galeria" className="form-label">Galeria de Imagens e Vídeos</label>
          <input type="file" className="form-control" id="galeria" multiple onChange={handleGalleryChange} />
        </div>

        
      </form>
        }
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? `Carregando: ${uploadProgress.toFixed(0)}%` : 'Adicionar Projeto'}
        </button>
      </form>
    </div>
  );
};

export default AddProjectForm;
