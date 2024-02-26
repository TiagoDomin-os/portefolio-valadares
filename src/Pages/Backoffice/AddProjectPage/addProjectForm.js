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
  const [featuredMedia, setFeaturedMedia] = useState(null);
  const [galeria, setGaleria] = useState([]);
  const [featuredMp4Videos, setFeaturedMp4Videos] = useState([]);
  const [youtubeLinks, setYoutubeLinks] = useState([]); 
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


  const handleMediaChange = (e) => setFeaturedMedia(e.target.files[0]);

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
      // Variável para armazenar a URL da mídia destacada (imagem ou vídeo)
      let featuredMediaUrl = null;
  
      // Verifica se algum arquivo foi selecionado para a mídia destacada
      if (featuredMedia) {
        // Determina o tipo da mídia (baseado na extensão do arquivo) e define a pasta de upload
        const mediaType = featuredMedia.type.split('/')[0]; // 'image' ou 'video'
        const uploadFolder = mediaType === 'image' ? 'featuredMedia' : 'featuredMedia';
  
        // Faz o upload do arquivo e armazena a URL retornada
        featuredMediaUrl = await handleUpload(featuredMedia, uploadFolder);
      }
  
      // Processa o upload da galeria de imagens
      const galleryUrls = await Promise.all(galeria.map(file => handleUpload(file, 'gallery')));
  
      const mp4VideoUrls = await Promise.all(featuredMp4Videos.map(file => handleUpload(file, 'mp4Videos')));

      // Adiciona o novo projeto ao Firestore com a mídia destacada (imagem ou vídeo) sob o mesmo campo
      await addDoc(collection(projectFirestore, 'projetos'), {
        nome,
        autores,
        categoria,
        featuredMedia: featuredMediaUrl, // Armazena a URL da mídia destacada (imagem ou vídeo)
        youtubeLinks,
        galeria: galleryUrls.filter(url => url !== null), // Filtra URLs nulas da galeria
        mp4Videos: mp4VideoUrls,  // Armazenar os URLs dos vídeos .mp4
        slug: createSlug(nome), // Utiliza a função de criação de slug
      });
  
      console.log("Projeto adicionado com sucesso.");
      alert('Projeto adicionado com sucesso!');
      navigate('/backoffice');
      // Aqui você pode adicionar a lógica de reset dos campos, se necessário
    } catch (error) {
      console.error("Erro ao adicionar projeto: ", error);
      alert('Erro ao adicionar projeto.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0); // Reseta o progresso de upload, se aplicável
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
            <option value="CORPORATE">Corporate</option>
            <option value="AFTERMOVIE">AfterMovie</option>
            <option value="COMMERCIAL">Commercial</option>
            

            {/* ... outras opções de categorias ... */}
          </select>
        </div>

        {/* <div className="mb-3">
          <label htmlFor="featuredImage" className="form-label">Imagem Destacada</label>
          <input type="file" className="form-control" id="featuredImage" onChange={handleImageChange} />
        </div> */}

        <div className="mb-3">
          <label htmlFor="featuredMedia" className="form-label">Mídia Destacada</label>
          <input
            type="file"
            className="form-control"
            id="featuredMedia"
            accept="image/*,video/mp4"
            onChange={handleMediaChange}
          />
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