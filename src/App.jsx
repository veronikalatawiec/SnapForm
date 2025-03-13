import './App.scss'
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<UserHome />} />
        <Route path="/form/create" element={<FormCreate />} />
        <Route path="/form/edit/:id" element={<FormEdit />} />
        <Route path="/form/responses/:id" element={<FormResponses />} />
        <Route path="/hosted/:id" element={<HostedForm />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
