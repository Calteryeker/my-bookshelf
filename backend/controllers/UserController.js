const User = require('../models/User');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = {
  async store(request, response) {

    const { login, senha, nome, email, data_nascimento, lista_livros } = request.body;
    const senhaHash = bcrypt.hashSync(senha, 10);
    const userData = request.body;

    //estudar moment, verificar melhor forma de armazenar data
    console.log(moment(data_nascimento, "DD/MM/YYYY"));


    User.collection.insertOne({
      login,
      senha: senhaHash,
      nome,
      email,
      data_nascimento: moment(data_nascimento, "DD/MM/YYYY")._i,
      lista_livros
    }, (error, result) => {
      if (error) {
        if (error.message.includes('email')) {
          return response.status(409).send('Validation failed: Email is not unique');
        }
        return response.status(409).send('Validation failed: Login is not unique');
      } else {
        return response.send(userData);
      }
    });

  }
};