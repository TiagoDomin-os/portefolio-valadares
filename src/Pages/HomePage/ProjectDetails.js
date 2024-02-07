import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../../Components/Navbar';
import CreditSection from '../../Components/CreditSection';
import DetailGallery from '../../Components/DetailGalery';
import Footer from '../../Components/Footer';

  const ProjectDetails = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);


  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  

  useEffect(() => {
    const fetchProjeto = async () => {
      const docRef = doc(projectFirestore, 'projetos', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProjeto({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("Nenhum projeto encontrado!");
      }
    };

    fetchProjeto();
  }, [id]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }



  const youtubeMedia = projeto.youtubeLinks?.length > 0
  ? projeto.youtubeLinks.map(url => ({ url, type: 'video' }))
  : [];
const galeriaMedia = projeto.galeria.map(url => ({ url, type: 'image' }));

const firstYoutubeVideo = youtubeMedia.shift(); // Remove e guarda o primeiro vídeo do YouTube

// Combina e embaralha todos os vídeos do YouTube restantes com as imagens da galeria
const shuffledMedia = shuffleArray([...youtubeMedia, ...galeriaMedia]);

// Se havia um vídeo do YouTube, coloque-o de volta na primeira posição
if (firstYoutubeVideo) {
  shuffledMedia.unshift(firstYoutubeVideo);
}

const autoresStr = projeto.autores?.join(', ') ?? ''; // Usando o operador opcional de encadeamento e coalescência nula



  return (
    <>
    <Navbar />
    <DetailGallery media={shuffledMedia} />
    <CreditSection nomeProjeto={projeto.nome} autores={projeto.autores} categoria={projeto.categoria} />

    <Footer />
    </>
  );
};

export default ProjectDetails;