import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { projectFirestore } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../../Components/Navbar';
import DetailGallery from '../../Components/DetailGalery';
import Footer from '../../Components/Footer';

const ProjectDetails = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState(null);

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

  const media = projeto.galeria.map(item => {
    return { url: item, type: 'image' }; // ou 'video' dependendo do tipo de mídia
  });

  

  return (
    <>
    <Navbar />
    <DetailGallery media={media} youtubeLinks={projeto.youtubeLinks} />
    <Footer />
    </>
  );
};

export default ProjectDetails;