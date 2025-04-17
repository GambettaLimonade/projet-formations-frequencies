// frontend/src/App.js
import React from 'react';
import './App.css';
//import Formations from './Formations';  // Importation du composant Formations
import LandingPage from './LandingPage';

function App() {
  return (
    <div className="App">
      <LandingPage /> {/* Affichage du composant Formations */}
    </div>
  );
}

export default App;
