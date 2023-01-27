
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
// const port = 3000
const helmet = require('helmet');
// const User = require(`./models/user`);
// const Sauce = require(`./models/sauce`);
const userRoutes = require('./routes/user');
const sauceRoutes = require('./routes/sauce');



const cors = require('cors');
// const password = "aX3AJ0yyENztp0yR"
// const uri = 'mongodb+srv://sam:aX3AJ0yyENztp0yR@cluster0.rbfmyck.mongodb.net/?retryWrites=true&w=majority';
const app = express();
mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://sam:aX3AJ0yyENztp0yR@cluster0.rbfmyck.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
  useUnifiedTopology: true })

.then(() => console.log('Connexion à MongoDB réussie !'))
.catch((err) => console.error('Connexion à MongoDB échouée !:', err));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json());


  app.use(helmet({
  crossOriginResourcePolicy: { policy: "same-site"}
}));
  
  // app.use('/api/sauces', (req, res, next) => {
  //   Thing.find()
  //     .then(sauce => res.status(200).json(sauce))
  //     .catch(error => res.status(400).json({ error }));
  // });

app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);


// app.listen(port, () => console.log("Listening on port" + port)) ;
module.exports = app;