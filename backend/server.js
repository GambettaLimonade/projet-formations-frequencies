const express = require('express');
const cors = require('cors');  // Importer le module CORS
const { Client } = require('pg');
const path = require('path');
const app = express();
const port = 3001;

// URL de connexion complète fournie
const connectionString = 'postgresql://postgres:oKMZurDTgbESldjFrVNRHfTwkzPnkZtQ@tramway.proxy.rlwy.net:58081/railway';

// Configuration de la connexion à PostgreSQL
const client = new Client({
  connectionString: connectionString,
});

// Connexion à PostgreSQL
client.connect()
  .then(() => {
    console.log('Connexion réussie à la base de données PostgreSQL');
  })
  .catch((err) => {
    console.error('Erreur de connexion à la base de données PostgreSQL', err.stack);
  });

// Activer CORS pour toutes les routes
app.use(cors());  // Cela permet au frontend d'accéder au backend depuis un autre domaine/port

// Middleware pour gérer les requêtes JSON
app.use(express.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Route pour récupérer toutes les formations
app.get('/formations', (req, res) => {
  client.query('SELECT * FROM formation', (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des formations');
    } else {
      res.json(result.rows);  // Envoie les formations en réponse
    }
  });
});

// Route pour récupérer toutes les catégories
app.get('/categories', (req, res) => {
  client.query('SELECT * FROM categorie', (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des catégories');
    } else {
      res.json(result.rows);
    }
  });
});


// Route pour récupérer les formations avec le site web du fournisseur
app.get('/formations-with-supplier', (req, res) => {
  const query = `
    SELECT f.id, f.titre, f.categorie_id, f.fournisseur_id, fr.site_web
    FROM formation f
    JOIN fournisseur fr ON f.fournisseur_id = fr.id;
  `;

  client.query(query, (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des formations avec fournisseur');
    } else {
      res.json(result.rows);
    }
  });
});



app.get('/search', (req, res) => {
  const searchTerm = req.query.q; // Récupère le terme de recherche depuis les paramètres de requête

  if (!searchTerm) {
    return res.status(400).send('Le terme de recherche est requis');
  }

  const query = `
    SELECT * FROM formation
    WHERE titre ILIKE $1
  `;
  const values = [`%${searchTerm}%`];

  client.query(query, values, (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de la recherche des formations');
    } else {
      res.json(result.rows);
    }
  });
});



// Démarrage du serveur
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
