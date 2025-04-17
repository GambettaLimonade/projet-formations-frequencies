import React, { useState, useEffect } from 'react';
import './Formations.css'; // Import du fichier CSS pour les styles

const Formations = () => {
  const [formations, setFormations] = useState([]);  
  const [filteredFormations, setFilteredFormations] = useState([]);  
  const [category, setCategory] = useState("");  
  const [search, setSearch] = useState("");  
  const [fournisseur, setFournisseur] = useState("");  // Nouveau filtre fournisseur

  useEffect(() => {
    fetch('http://localhost:3001/formations')  
      .then((response) => response.json())
      .then((data) => {
        setFormations(data);
        setFilteredFormations(data);  
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Fonction de gestion des changements de catégorie
  const handleCategoryChange = (event) => setCategory(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);
  const handleFournisseurChange = (event) => setFournisseur(event.target.value);  // Gestion du changement fournisseur

  // Mise à jour des formations filtrées
  useEffect(() => {
    let filteredData = formations;

    // Filtrer par catégorie
    if (category) {
      filteredData = filteredData.filter((formation) => formation.categorie_id === parseInt(category));
    }

    // Filtrer par fournisseur
    if (fournisseur) {
      filteredData = filteredData.filter((formation) => formation.fournisseur_id === parseInt(fournisseur));
    }

    // Filtrer par titre
    if (search) {
      filteredData = filteredData.filter((formation) => formation.titre.toLowerCase().includes(search.toLowerCase()));
    }

    setFilteredFormations(filteredData);
  }, [category, search, fournisseur, formations]);

  return (
    <div className="container">
      {/* Header avec texte aligné à droite */}
      <header className="header">
        <h1>Hub de Formations</h1>
      </header>

      {/* Barre de recherche avec filtre par catégorie, fournisseur et titre */}
      <div className="filters">
        <input
          type="text"
          placeholder="Rechercher par titre"
          value={search}
          onChange={handleSearchChange}
          className="search-bar"
        />

        {/* Sélecteur de catégorie */}
        <select onChange={handleCategoryChange} value={category} className="filter-select">
          <option value="">Sélectionner une catégorie</option>
          <option value="3">Informatique</option>
          <option value="4">Marketing</option>
          <option value="5">Sciences</option>
          <option value="6">Business</option>
          <option value="7">Langues</option>
          <option value="8">Associatif</option>
        </select>

        {/* Sélecteur de fournisseur */}
        <select onChange={handleFournisseurChange} value={fournisseur} className="filter-select">
          <option value="">Sélectionner un fournisseur</option>
          <option value="11">Coursera</option> {/* Seulement Coursera pour le moment */}
          <option value="12">Le mouvement associatif</option> {/* Seulement Coursera pour le moment */}
        </select>
      </div>

      {/* Liste des formations filtrées */}
      <ul className="formation-list">
        {filteredFormations.length > 0 ? (
          filteredFormations.map((formation) => (
            <li key={formation.id} className="formation-item">
              <a href={formation.lien} target="_blank" rel="noopener noreferrer" className="formation-link">
                {formation.titre}
              </a>
            </li>
          ))
        ) : (
          <li>Aucune formation trouvée.</li>
        )}
      </ul>
    </div>
  );
};

export default Formations;
