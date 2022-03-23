const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = {
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

    res.status(200).send({user, token});
  }
};