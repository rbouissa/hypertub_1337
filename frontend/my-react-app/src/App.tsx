import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Team } from './pages/Team';
import { Research } from './pages/Research';
import { Events } from './pages/Events';
import { AboutUM6P } from './pages/AboutUM6P';
import { Recruitment } from './pages/Recruitment';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import  ProjectManager  from './admin/ProjectManager';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Resources } from './pages/research/Resources';
import { Laboratory } from './pages/research/Laboratory';
import { Publications } from './pages/research/Publications';
import AdminDashboard from './admin/admin_dashbord';
import RequruitementDashbord from './admin/Reqruitement_admin';
import "leaflet/dist/leaflet.css";
import {Dashboard }from './pages/Dashboard';


function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background dark:bg-dark-bg text-text-primary dark:text-dark-text transition-colors duration-300">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/team" element={<Team />} />
                <Route path="/Recruitment" element={<Recruitment />} />
                <Route path="/research" element={<Research />} />
                {/* <Route path="/research/resources" element={<Resources />} /> */}
                <Route path="/research/laboratory" element={<Laboratory />} />
                <Route path="/research/publications" element={<Publications />} />
                <Route path="/events" element={<Events />} />
                <Route path="/about-um6p" element={<AboutUM6P />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/arcair-backoffice/5h2n9t3v8q/" element={<Login />} />
                <Route
                  path="/admin-panel"
                  element={
                      <ProtectedRoute>
                      <AdminDashboard />
                      </ProtectedRoute>
                    }
                  />
                <Route
                  path="/admin-event"
                element={
                      <ProtectedRoute>
                      <ProjectManager />
                      </ProtectedRoute>
                        }
                        />
                <Route
        path="/admin-jobs"
        element={
          <ProtectedRoute>
            <RequruitementDashbord />
          </ProtectedRoute>
        }
      />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;