// Import du package de cryptage(hacher le mot de passe)
const bcrypt = require(`bcrypt`)
// Import du package jsonwebtoken
// Sécurisation de la connexion grâce à des tokens uniques.
const jwt = require(`jsonwebtoken`)
// Import du modèle user.
const User = require(`../models/User`)

// Contrôlleur pour la création d'un compte utilisateur.

exports.signup = (req, res, next) => {
// Hasher le mot de passe 
    bcrypt.hash(req.body.password, 10)
    
      .then(hash => { // Récupération du hash
        const user = new User({  //On cré un nouvel utilisateur avec le mot de passe crypté.
          email: req.body.email,
          password: hash
        });
        user.save() //sauvegarde de lèutilisateur dans la base de données.
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
  
// Contrôlleur pour la connexion à un compte utilisateur.
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })//Trouver si un utilisateur corréspond à l'adresse mail envoyer dans la requêtte
        .then(user => {
            if (!user) { // Si l'utilisateur n'a pas été trouvé
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
// Comparer le mot de passe
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {//Mot de passe non valide
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({//Mot de passe valide, on renvoit un objet Json 
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };