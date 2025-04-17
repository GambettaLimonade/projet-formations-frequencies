// Header.js
import React from 'react';
import './Header.css'; // Assurez-vous de créer ce fichier CSS
import headerLogo from './images/header_frequencies.png'; // Importez l'image
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={headerLogo} alt="Logo" className="logo-image" />
      </div>
      <nav className="nav">
        <Link to="/">Accueil</Link>
        <a href="https://frequencies.fr/association">L'association</a>
        <a href="https://frequencies.fr/fictions-sonores">Nos projets</a>
        <a href="https://frequencies.fr/contact">Contact</a>
        <a href="https://frequencies.assoconnect.com/collect/description/340064-c-collecte-de-dons-pour-frequencies">Nous soutenir</a>
      </nav>
    </header>
  );
};

export default Header;