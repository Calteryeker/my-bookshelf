const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Book'],
    required: false,
  },
  titulo: {
    type: String,
    required: true,
  },
  autor: {
    type: String,
    required: true,
  },
  imagem: String,
  ano_publicacao: String,
  descricao: String,
  lista_generos: [String],
  avaliacao: Number,
  estado: Number //0 - Guardado, 1 - Lendo, 2 - Finalizado;
});

module.exports = BookSchema;
