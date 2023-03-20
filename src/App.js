import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home'
import ProjectsMenu from './Components/ProjectsMenu';
import Layout from './layout';
import Login from './Pages/Login';
import { AuthProvider } from './auth';
import { RequireAuth } from './RequireAuth';
import Dashboard from './Pages/Dashboard'
import './App.css';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectsMenu />} />
          </Route >
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
