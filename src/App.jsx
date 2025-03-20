import './App.scss'
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage/SignUpPage.jsx';
import SignInPage from './pages/SignInPage/SignInPage.jsx';
import HomePage from './pages/HomePage/HomePage.jsx';
import FormCreatePage from './pages/FormCreatePage/FormCreatePage.jsx';
import FormEditPage from './pages/FormEditPage/FormEditPage.jsx';
import FormResponsesPage from './pages/FormResponsesPage/FormResponsesPage.jsx';
import HostedFormPage from './pages/HostedFormPage/HostedFormPage.jsx';


export default function App() {
  // check for token when comp is mounted
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check if token is in localStorage initially
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  });

  return (
    <>
      <Router>
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} /> */}
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/home" element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/form/create" element={isAuthenticated ? <FormCreatePage /> : <Navigate to="/" />} />
        <Route path="/form/edit/:id" element={isAuthenticated ? <FormEditPage /> : <Navigate to="/" />} />
        <Route path="/form/responses/:id" element={isAuthenticated ? <FormResponsesPage /> : <Navigate to="/" />} />
        <Route path="/hosted/:id" element={<HostedFormPage />} />
      </Routes>
    </Router>
    </>
  )
}

