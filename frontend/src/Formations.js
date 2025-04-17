import React, { useState, useEffect } from 'react';
import './Formations.css';
import Header from './Header';
import Carousel from './Carousel';
import Footer from './Footer';
import CategoryBubbles from './CategoryBubbles';

const Formations = () => {
  const [formations, setFormations] = useState([]);
  const [randomFormations, setRandomFormations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/formations-with-supplier')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Vérifiez ici que chaque formation a un site_web
        setFormations(data);
        selectRandomFormations(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const selectRandomFormations = (data) => {
    const shuffled = data.sort(() => 0.5 - Math.random());
    setRandomFormations(shuffled.slice(0, 4));
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);

    if (value) {
      const filteredData = formations.filter((formation) =>
        formation.titre.toLowerCase().includes(value.toLowerCase())
      );
      setRandomFormations(filteredData.slice(0, 5));
    } else {
      selectRandomFormations(formations);
    }
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    const filteredData = formations.filter(
      (formation) => formation.categorie_id === categoryId
    );
    selectRandomFormations(filteredData);
  };

  return (
    <div className="container">
      <Header />
      <div className="filters">
        <input
          type="text"
          placeholder="Trouve ta formation"
          value={search}
          onChange={handleSearchChange}
          className="search-bar-wide"
        />
        {search && (
          <ul className="dropdown-menu">
            {randomFormations.length > 0 ? (
              randomFormations.map((formation) => (
                <li key={formation.id} className="dropdown-item">
                  <a href={formation.lien} target="_blank" rel="noopener noreferrer" className="formation-link">
                    {formation.titre}
                  </a>
                </li>
              ))
            ) : (
              <li className="dropdown-item">Aucune formation trouvée.</li>
            )}
          </ul>
        )}
      </div>
      <Carousel />

      <CategoryBubbles onSelectCategory={handleCategorySelect} />

      <div className="formations-list">
        {randomFormations.map((formation) => (
          <div key={formation.id} className="formation-card">
            <h3>{formation.titre}</h3>
            {formation.site_web && (
              <a href={formation.site_web} target="_blank" rel="noopener noreferrer">
                {formation.site_web}
              </a>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Formations;