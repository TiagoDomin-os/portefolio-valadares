import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import LoginPage from './Pages/Backoffice/LoginPage';

import HomePage from './Pages/HomePage/HomePage';
import AddProjectForm from './Pages/Backoffice/AddProjectPage/addProjectForm';
import ProjectDetails from './Pages/HomePage/ProjectDetails'; // Componente que você criará para os detalhes
import BackOfficeProjectDetail from './Pages/Backoffice/BackofficeProjectDetail';
import BackofficeProjectListPage from './Pages/Backoffice/BackofficeProjectListPage';
import BackofficeProjectDetails from './Pages/Backoffice/BackofficeProjectDetail';
import BackofficeHomePage from './Pages/Backoffice/BackofficeSite';
import AboutUs from './Pages/About';
import Team from './Pages/TeamPage';







const App = () => {
  
  return (
    <>
    
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projetos/:slug" element={<ProjectDetails />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/team" element={<Team />} />



          
          {/* Envolva as rotas de backoffice com PrivateRoute */}
          {/* <Route path="/backoffice" element={<PrivateRoute><BackofficeHomePage/></PrivateRoute>} /> */}
          <Route path="/backoffice/add-project" element={<PrivateRoute><AddProjectForm /></PrivateRoute>} />
          <Route path="/backoffice/projetos/:projectId" element={<PrivateRoute><BackofficeProjectDetails /></PrivateRoute>} />
          <Route path="/backoffice/" element={<PrivateRoute><BackofficeProjectListPage /></PrivateRoute>} />


          {/* Adicione uma rota para a página de login */}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
    </>
  );
}

export default App;
