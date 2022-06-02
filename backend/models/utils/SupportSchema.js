const mongoose = require('mongoose');

const SupportSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Support'],
    required: false,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  mensagem: {
    type: String,
    required: true,
  }
  
}, {collection: "support"});

module.exports = mongoose.model('SupportMessage', SupportSchema);