import React, { useState, useEffect } from 'react';
import { projectFirestore } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import '../../styles/Main/Home/HomePage.css';
import Gallery from '../../Components/HomeGalery';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import BackofficeNavbar from '../../Components/BackofficeNavbar';


const BackofficeHomePage = () => {
  const [projetos, setProjetos] = useState([]);

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

  return (
    <>
      <BackofficeNavbar />
      <Gallery projetos={projetos} />
      <Footer />
    </>
  );
};

export default BackofficeHomePage;