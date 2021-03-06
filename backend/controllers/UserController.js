const User = require('../models/User');
const bcrypt = require('bcrypt');
const moment = require('moment');

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
    const { senhaAntiga, novaSenha, nome, email, data_nascimento } = req.body;
    var senhaHash;

    if(novaSenha){
      const userRecovered = await User.findById({_id: req.userId}).select('+senha');
      if(await bcrypt.compare(senhaAntiga, userRecovered.senha))
        senhaHash = await bcrypt.hashSync(novaSenha,10);
      else{
        return res.status(401).send({err: 'Error: Password doesnt match!'})
      }
    }
    User.updateOne({_id: req.userId}, {senha: senhaHash, 
      nome: nome, email: email, data_nascimento: moment(data_nascimento, "DD/MM/YYYY")._d})
      .then( result => {
        return res.status(200).send({msg : 'Success: User updated!'});
      }).catch( err => {
        return res.status(500).send({err: err, msg: 'Error: Fail updating user!'});
      });

  },

  //delete user
  async delete(req, res){
    const senha = req.body.senha;
    const userRecovered = await User.findById(req.userId).select('+senha -lista_livros');
    if(!await bcrypt.compare(senha, userRecovered.senha)){
      return res.status(401).send({err: 'Error: Password doesnt match!'})
    }
    else{
      await User.deleteOne({_id: req.userId});
    }

    if(await User.countDocuments({_id: req.userId}) != 0)
        return res.status(500).send({userId: req.userId, error:'Error: Cannot delete user!'});

    return res.status(200).send({userId: req.userId, msg:'Success: User deleted!'});
  },

  //recover user
  async recUser(req, res){
    const userRecovered = await User.findById(req.userId).select('-lista_livros');

    if(userRecovered){
      return res.status(200).send({user: userRecovered});
    }
      
      return res.status(404).send("Error: User not found!")
  },

  async testLogin(req, res){
    const {login} = req.body;
    if(!await User.findOne({login : login})){
      return res.status(200).send()
    }
    return res.status(409).send()
  },

  async testEmail(req, res){
    const {email} = req.body;
    if(!await User.findOne({email : email})){
      return res.status(200).send()
    }
    return res.status(409).send()
  },
};