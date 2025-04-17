// LandingPage.js
import React from 'react';
import './LandingPage.css';
import Header from './Header';
import Waves from './Waves';
import TextPressure from './TextPressure';
import Button from './Button';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header/>
      <Waves/>
      <TextPressure text="Frequencies" flex={true} alpha={false} stroke={false} width={true} weight={true} italic={true} textColor="#333" strokeColor="#ff0000" minFontSize={36}/>
      <Button/>
      <Footer/>


    </div>
  );
};

export default LandingPage;