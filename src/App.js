import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import AddProjectForm from './Pages/addProjectForm';
import ProjectDetails from './Pages/ProjectDetails'; // Componente que você criará para os detalhes
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-project" element={<AddProjectForm />} />
        <Route path="/projetos/:id" element={<ProjectDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
