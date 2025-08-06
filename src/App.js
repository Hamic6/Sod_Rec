import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CandidatePage from './pages/CandidatePage';
import AdminPage from './pages/AdminPage';
import Dashboard from './components/Dashboard';
import EligibilityChecker from './components/EligibilityChecker';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import CandidateDetail from './components/CandidateDetail'; // <-- Ajouté
import SplashScreen from './components/SplashScreen';
import Login from './pages/Login';
import RequireAdmin from './components/RequireAdmin';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/candidate" element={<CandidatePage />} />
          <Route path="/admin" element={
            <RequireAdmin>
              <AdminPage />
            </RequireAdmin>
          } />
          <Route path="/admin/candidates" element={
            <RequireAdmin>
              <CandidateList />
            </RequireAdmin>
          } />
          <Route path="/admin/dashboard" element={
            <RequireAdmin>
              <Dashboard />
            </RequireAdmin>
          } />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/eligibility-checker" element={<EligibilityChecker />} />
          <Route path="/candidate-form" element={<CandidateForm />} />
          <Route path="/candidate-list" element={<CandidateList />} />
          <Route path="/candidat/:id" element={<CandidateDetail />} /> {/* Détail candidat */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;