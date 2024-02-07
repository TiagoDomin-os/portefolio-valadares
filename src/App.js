import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import AddProjectForm from './Pages/Backoffice/AddProjectPage/addProjectForm';
import ProjectDetails from './Pages/HomePage/ProjectDetails'; // Componente que você criará para os detalhes
import BackOfficeProjectDetail from './Pages/Backoffice/BackofficeProjectDetail';
import BackofficeProjectListPage from './Pages/Backoffice/BackofficeProjectListPage';



const App = () => {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-project" element={<AddProjectForm />} />
        <Route path="/projetos/:id" element={<ProjectDetails />} />
      
        <Route path="/backoffice" element={<BackofficeProjectListPage  />} />
        <Route path="/backoffice/projetos/:projectId" element={<BackOfficeProjectDetail  />} />
    
      </Routes>
    </Router>
  );
}

export default App;
