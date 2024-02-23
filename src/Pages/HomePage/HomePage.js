import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import '../../styles/Main/Home/HomePage.css';
import Gallery from '../../Components/HomeGalery';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import '../../styles/Main/Navbar/Navbar.css';
import useFirstVisit from '../../hooks/useFirstVisit';

const HomePage = () => {
  const [projetos, setProjetos] = useState([]);
  const isFirstVisit = useFirstVisit();
  const [videoEnded, setVideoEnded] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');


  useEffect(() => {
    const fetchProjetos = async () => {
      const querySnapshot = await getDocs(collection(projectFirestore, 'projetos'));
      const projetosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjetos(projetosData);
    };

    fetchProjetos();
  }, []);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (isFirstVisit) {
        const storage = getStorage();
        const videoRef = ref(storage, 'entranceAnimation/LOGO DE ENTRADA SITE - HORIZONTAL.mov'); // Ajuste conforme necessário

        try {
          const url = await getDownloadURL(videoRef);
          setVideoUrl(url);
        } catch (error) {
          console.error("Erro ao obter URL do vídeo:", error);
        }
      }
    };

    fetchVideoUrl();
  }, [isFirstVisit]);

  const handleVideoEnd = () => {
    setVideoEnded(true);
  };





 


  const [filtroCategoria, setFiltroCategoria] = useState('All');
  const [categoriaAtiva, setCategoriaAtiva] = useState('All');

  const handleFilterClick = categoria => {
    setFiltroCategoria(categoria);
    setCategoriaAtiva(categoria);
  };

  const categorias = ['All', ...new Set(projetos.map(projeto => projeto.categoria))];


  
  if (!projetos) {
    return <div>Loading...</div>; // Considerar adicionar um spinner ou mensagem de carregamento
  }



  return (
    <>
      {/* {isFirstVisit && !videoEnded && videoUrl && (
        <div className="video-container">
          <video autoPlay onEnded={handleVideoEnd} width="100%" height="auto" className="intro-video">
            <source src={videoUrl} type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>
      )} */}

      <Navbar categorias={categorias} onFilterClick={handleFilterClick} categoriaAtiva={categoriaAtiva} />
      <Gallery projetos={projetos} filtroCategoria={filtroCategoria} /> {/* Passando filtroCategoria para Gallery */}
      <Footer />
    </>
  );
};

export default HomePage;
