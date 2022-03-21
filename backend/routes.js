const { Router } = require('express');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const routes = Router();

const AuthMiddleware = require('./middleware/auth.js')

//Rota de cadastro de usuário
routes.post('/signup', UserController.signup);

//Rota para realizar autenticação de um usuário
routes.post('/login', AuthController.login);

//Rota para alterar informações de um usuário
routes.patch('/u/profile', AuthMiddleware, UserController.update);

//Rota para deletar um usuário do sistema
routes.delete('/u/delete', AuthMiddleware, UserController.delete);

module.exports = routes;