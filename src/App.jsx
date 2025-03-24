import "./App.scss";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.jsx";
import SignInPage from "./pages/SignInPage/SignInPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import FormCreatePage from "./pages/FormCreatePage/FormCreatePage.jsx";
import FormResponsesPage from "./pages/FormResponsesPage/FormResponsesPage.jsx";
import HostedFormPage from "./pages/HostedFormPage/HostedFormPage.jsx";
import FormSubmittedPage from "./pages/FormSubmittedPage/FormSubmittedPage.jsx";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/form/submitted" element={<FormSubmittedPage />} />
          <Route path="/form/live/:user_id/:id" element={<HostedFormPage />} />

          <Route
            path="/"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/home"
            element={isAuthenticated ? <HomePage /> : <Navigate to="/signin" />}
          />
          <Route
            path="/form/create"
            element={isAuthenticated ? <FormCreatePage /> : <Navigate to="/" />}
          />

          <Route
            path="/form/responses/:id"
            element={
              isAuthenticated ? <FormResponsesPage /> : <Navigate to="/" />
            }
          />
        </Routes>
      </Router>
    </>
  );
}
