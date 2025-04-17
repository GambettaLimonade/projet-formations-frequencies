// LandingPage.js
import React from 'react';
import './LandingPage.css';
import Waves from './Waves';
import TextPressure from './TextPressure';
import Button from './Button';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="header">
        <div className="logo">Logo</div>
        <nav className="nav">
          <a href="#home">Accueil</a>
          <a href="https://frequencies.fr/association">L'association</a>
          <a href="https://frequencies.fr/fictions-sonores">Nos projets</a>
          <a href="https://frequencies.fr/contact">Contact</a>
          <a href="https://frequencies.assoconnect.com/collect/description/340064-c-collecte-de-dons-pour-frequencies">Nous soutenir</a>
        </nav>
      </header>
      <Waves/>
      <TextPressure text="Frequencies" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor="#333" strokeColor="#ff0000" minFontSize={36}/>
      <Button/>
      <Footer/>


    </div>
  );
};

export default LandingPage;