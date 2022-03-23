const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const authConfig = require('../config/auth.json');
const { update } = require('../models/User');

module.exports = {
  async signup(req, res) {

    const { login, senha, nome, email, data_nascimento, lista_livros } = req.body;
    const senhaHash = bcrypt.hashSync(senha, 10);

    //estudar moment, verificar melhor forma de armazenar data
    //console.log(moment(data_nascimento, "DD/MM/YYYY"));


    User.collection.insertOne({
      login,
      senha: senhaHash,
      nome,
      email,
      data_nascimento: moment(data_nascimento, "DD/MM/YYYY")._d,
      lista_livros
    }, (error, result) => {
      if (error) {
        if (error.message.includes('email')) {
          return res.status(409).send('Error: Email is not unique!');
        }
        return res.status(409).send('Error: Login is not unique!');
      } else {
        return res.status(200).send(req.body);
      }
    });

  },

  //update user
  async update(req, res){
    const { senha, nome, email, data_nascimento } = req.body;
    const senhaHash = bcrypt.hashSync(senha,10);

    User.updateOne({_id: req.userId}, {senha: senhaHash, 
      nome: nome, email: email, data_nascimento: moment(data_nascimento, "DD/MM/YYYY")._d}, 
      (err, result) => {
        if(err)
          return res.status(400).send({err: err, msg: 'Error: Fail updating user!'});

        return res.status(200).send({data: req.body, msg : 'Success: User updated!'});
      });

  },

  //delete user
  async delete(req, res){
    await User.deleteOne({_id: req.userId});

    if(await User.countDocuments({_id: req.userId}) != 0)
        return res.status(500).send({userId: req.userId, error:'Error: Cannot delete user!'});

    res.status(200).send({userId: req.userId, msg:'Success: User deleted!'});
  }
};