// Button.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Button.css';

const Button = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/formations');
  };

  return (
    <div className="button-container">
      <button className="find-your-way-button" onClick={handleClick}>
        FIND YOUR WAY &rarr;
      </button>
    </div>
  );
};

export default Button;