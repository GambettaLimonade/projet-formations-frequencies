import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Carousel.css';

// Importer les images
import formationImage from './images/image_carousel_1.jpg';
import webinarImage from './images/image_carousel_2.jpg';
import whitepaperImage from './images/image_carousel_3.jpg';

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="carousel-slide">
          <img src={formationImage} alt="Formation" className="carousel-image" />
          <div className="carousel-content">
            <h2>Formez vous aux métiers de demain</h2>
            <p>Des compétences pour l'avenir</p>
            <button className="carousel-button">Accéder aux formations</button>
          </div>
        </div>
        <div className="carousel-slide">
          <img src={webinarImage} alt="Webinar" className="carousel-image" />
          <div className="carousel-content">
            <h2>Découvrez les webinars du moment</h2>
            <p>Les idées d'aujourd'hui sont les projets de demain</p>
            <button className="carousel-button">Voir les webinars</button>
          </div>
        </div>
        <div className="carousel-slide">
          <img src={whitepaperImage} alt="Livre Blanc" className="carousel-image" />
          <div className="carousel-content">
            <h2>Explorez nos livres blancs</h2>
            <p>Des insights pour éclairer votre stratégie</p>
            <button className="carousel-button">Lire les livres blancs</button>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;