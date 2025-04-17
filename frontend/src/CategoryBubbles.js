import React, { useState, useEffect } from 'react';
import './CategoryBubbles.css';

const CategoryBubbles = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/categories')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Vérifiez la structure des données ici
        setCategories(data);
      })
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="category-bubbles">
      {categories.map((category) => (
        <div
          key={category.id}
          className="category-bubble"
          onClick={() => onSelectCategory(category.id)}
        >
          {category.nom} {/* Utilisez 'nom' pour afficher le nom de la catégorie */}
        </div>
      ))}
    </div>
  );
};

export default CategoryBubbles;