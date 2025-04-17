// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './LandingPage';
import Formations from './Formations';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/formations" element={<Formations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;