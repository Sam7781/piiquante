const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator')
// Schéma de données utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },//Pour éviter d'avoir plusieurs comptes qui ont la même adresse mail.
  password: { type: String, required: true },
});
// Appliquer le validateur en tant que plugin au schéma
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);