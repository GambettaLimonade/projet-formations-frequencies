// Footer.js
import React from 'react';
import './Footer.css';
import footerLogo from './images/footer_frequencies.png'; // Assurez-vous que le chemin est correct

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <p>Association Frequencies</p>
        <p>RNA : W313035175</p>
        <p>Une équipe française investie dans la création et la production de fictions sonores.</p>
      </div>
      <div className="footer-center">
        <div className="footer-logo">
          <img src={footerLogo} alt="Logo" className="logo-image" />
        </div>
      </div>
      <div className="footer-right">
        <p>Suivez-nous sur les réseaux sociaux :</p>
        <p>Déclaration d'accessibilité</p>
        <p>Light Mode</p>
      </div>
      <div className="footer-bottom">
        <p>Ce site web est actuellement dans sa version bêta. Vous avez trouvé un bug ? Contactez-nous par mail !</p>
      </div>
    </footer>
  );
};

export default Footer;