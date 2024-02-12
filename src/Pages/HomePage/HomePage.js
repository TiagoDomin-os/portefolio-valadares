import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../../styles/Main/HomePage.css';
import Gallery from '../../Components/HomeGalery';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import '../../styles/Main/Navbar/Navbar.css';


const HomePage = () => {
  const [projetos, setProjetos] = useState([]);

  const [filtroCategoria, setFiltroCategoria] = useState('All');
  const [categoriaAtiva, setCategoriaAtiva] = useState('All');


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


  const handleFilterClick = categoria => {
    setFiltroCategoria(categoria);
    setCategoriaAtiva(categoria);
  };
  
  
  const categorias = ['All', ...new Set(projetos.map(projeto => projeto.categoria))];


  if (!projetos) {
    // Você pode renderizar um loading spinner aqui ou simplesmente retornar null ou outro placeholder
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar categorias={categorias} onFilterClick={handleFilterClick} categoriaAtiva={categoriaAtiva} />
      <Gallery projetos={projetos.filter(projeto => filtroCategoria === 'All' || projeto.categoria === filtroCategoria)} />
      <Footer />
    </>
  );
};

export default HomePage;