// Importation d'express, Framework basé sur node.js.
const express = require('express');

// On importe mongoose pour pouvoir utiliser la base de donnéés
const mongoose = require('mongoose');

// Module qui fournit des utilitaires pour travailler avec les chemins de fichiers et de répertoires.
const path = require('path');

// Helmet est une collection de middleware pour Express qui vous aide à sécuriser vos applications en définissant certains headers HTTP.
const helmet = require('helmet');

// Importation de la route user.
const userRoutes = require('./routes/user');

// Importation de la route sauce.
const sauceRoutes = require('./routes/sauce');


const app = express();

// Connection à la base de données.
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://sam:aX3AJ0yyENztp0yR@cluster0.rbfmyck.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !:', err));

//  Définition de headers pour éviters les erreurs de CORS.
app.use((req, res, next) => {
  // accéder à notre API depuis n'importe quelle origine ( '*' ).
    res.setHeader('Access-Control-Allow-Origin', '*');
  // ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.).
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  // envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Utilisé pour parser le corps des réponses en JSON
app.use(express.json());

// Helmet est un package nodejs qui aide à protéger votre serveur de certaines vulnérabilités Web bien connues en définissant les en-têtes de réponse HTTP de manière appropriée. 
  app.use(helmet({
  crossOriginResourcePolicy: { policy: "same-site"}
 }));

// Routes utilisateur
app.use('/api/auth', userRoutes);
// Midleware qui permet de charger les fichiers qui sont dans le dossier statique images.
app.use('/images', express.static(path.join(__dirname, 'images')));
// Pour cette route on utilise le router de sauceRoutes
app.use('/api/sauces', sauceRoutes);

// Export de app
module.exports = app;