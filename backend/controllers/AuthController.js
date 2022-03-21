const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const authConfig = require('../config/auth.json');

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
        return response.status(201).send('Usuario cadastrado');
      }
    });

  },

  async login(req, res){
      
    const {loginEmail, senha} = req.body;
    var user = await User.findOne({login: loginEmail}).select('+senha');

    if(!user)
      user = await User.findOne({email: loginEmail}).select('+senha');

    if(!user)
      return res.status(400).send('Error: User not found!');

    if(!await bcrypt.compare(senha, user.senha))
      return res.status(400).send('Error: Incorrect password!');

    user.senha = undefined;

    const token = jwt.sign({id: user.id}, authConfig.secret, {
      expiresIn: 86400,
    });



    res.send({user, token});
  }
};