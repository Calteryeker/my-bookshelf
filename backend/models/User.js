const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const BookSchema = require('./utils/BookSchema');

const UserSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
    unique: true,
  },
  senha: {
    type: String,
    required: true,
    select: false,
  },
  nome: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  data_nascimento: {
    type: Date,
    required: true,
  },
  lista_livros: [BookSchema]
}, { collection: 'user' });

module.exports = mongoose.model('User', UserSchema);