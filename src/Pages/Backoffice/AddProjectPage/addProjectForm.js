import React, { useState } from 'react';
import { projectStorage, projectFirestore } from '../../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import FileUploader from './fileUploaded'; // Ajuste o caminho conforme necessário
import BackofficeNavbar from '../../../Components/Navbars/BackofficeNavbar';

import { useNavigate } from 'react-router-dom'; // Importe useNavigate

import 'bootstrap/dist/css/bootstrap.min.css';
import BackofficeProjectListPage from '../BackofficeProjectListPage';


const fileUploader = new FileUploader(projectStorage);

const AddProjectForm = () => {
  const [nome, setNome] = useState('');
  const [autores, setAutores] = useState(['']);
  const [categoria, setCategoria] = useState('');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galeria, setGaleria] = useState([]);

  const [featuredMp4Videos, setFeaturedMp4Videos] = useState([]);


  const [youtubeLinks, setYoutubeLinks] = useState([]); // Estado para gerenciar os links do YouTube
  const navigate = useNavigate();

  const handleAutorChange = (e, index) => {
    const newAutores = [...autores];
    newAutores[index] = e.target.value;
    setAutores(newAutores);
  };

  const addAutorInput = () => {
    setAutores([...autores, '']);
  };

  const removeAutorInput = (index) => {
    const newAutores = autores.filter((_, idx) => idx !== index);
    setAutores(newAutores);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageChange = (e) => setFeaturedImage(e.target.files[0]);

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files).filter(file =>
      file.type.startsWith('image/') && (file.type.endsWith('/png') || file.type.endsWith('/jpeg') || file.type.endsWith('/gif'))
    );
    setGaleria([...galeria, ...files]);
  };

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

  const createSlug = (name) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    try {
      const imageUrl = featuredImage ? await handleUpload(featuredImage, 'featuredImages') : null;
      const galleryUrls = await Promise.all(galeria.map(file => handleUpload(file, 'gallery')));
      const mp4VideoUrls = await Promise.all(featuredMp4Videos.map(file => handleUpload(file, 'mp4Videos')));

      await addDoc(collection(projectFirestore, 'projetos'), {
        nome,
        autores,
        categoria,
        featuredImage: imageUrl,
        youtubeLinks,
        galeria: galleryUrls.filter(url => url !== null),
        mp4Videos: mp4VideoUrls,  // Armazenar os URLs dos vídeos .mp4
        slug: createSlug(nome), // Adiciona o slug aqui
      });
  
      console.log("Projeto adicionado com sucesso.");
      alert('Projeto adicionado com sucesso!');
      navigate('/backoffice');
      // Reset dos campos aqui...
    } catch (error) {
      console.error("Erro ao adicionar projeto: ", error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

 
  const handleMp4VideoChange = (e) => {
    setFeaturedMp4Videos([...e.target.files]);
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

        {autores.map((autor, index) => (
          <div key={index} className="mb-3 d-flex">
            <input type="text" className="form-control" value={autor} onChange={(e) => handleAutorChange(e, index)} placeholder="Nome do Autor" />
            <button type="button" className="btn btn-danger ml-2" onClick={() => removeAutorInput(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addAutorInput}>Adicionar Autor</button>

        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select className="form-control" id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option value="">Selecione uma Categoria</option>
            <option value="Corporate">Corporate</option>
            <option value="AfterMovie">AfterMovie</option>
            <option value="Commercial">Commercial</option>
            

            {/* ... outras opções de categorias ... */}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="featuredImage" className="form-label">Imagem Destacada</label>
          <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
        </div>

        {youtubeLinks.map((link, index) => (
          <div key={index} className="mb-3 d-flex">
            <input type="text" className="form-control" value={link} onChange={(e) => handleYoutubeLinkChange(e, index)} placeholder="Link do YouTube" />
            <button type="button" className="btn btn-danger ml-2" onClick={() => removeYoutubeLinkInput(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn btn-secondary mb-3" onClick={addYoutubeLinkInput}>Adicionar Link do YouTube</button>

        <div className="mb-3">
          <label htmlFor="galeria" className="form-label">Galeria de Imagens</label>
          <input type="file" className="form-control" id="galeria" multiple accept=".png,.jpeg,.gif" onChange={handleGalleryChange} />
        </div>



        <div className="mb-3">
        <label htmlFor="featuredMovVideo" className="form-label">Vídeo em Destaque .mp4</label>
                <input 
          type="file" 
          className="form-control" 
          id="featuredMp4Video" 
          onChange={handleMp4VideoChange} 
          accept=".mp4"
          multiple  // Para permitir a seleção de múltiplos ficheiros
        />
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