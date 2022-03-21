const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const authConfig = require('../config/auth.json');
const { update } = require('../models/User');

module.exports = {
  async signup(request, response) {

    const { login, senha, nome, email, data_nascimento, lista_livros } = request.body;
    const senhaHash = bcrypt.hashSync(senha, 10);
    const userData = request.body;

    //estudar moment, verificar melhor forma de armazenar data
    //console.log(moment(data_nascimento, "DD/MM/YYYY"));


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

  },

  //delete user
  async update(req, res){

  },

  //update user
  async delete(req, res){
    await User.deleteOne({_id: req.userId});

    if(await User.countDocuments({_id: req.userId}) != 0)
        return res.status(500).send({userId: req.userId, error:'Error: Cannot delete user'});

    res.status(200).send({userId: req.userId, msg:'Success: User deleted!'});
  }
};