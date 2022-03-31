const { Router } = require('express');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const BookController = require('./controllers/BookController');
const routes = Router();

const AuthMiddleware = require('./middleware/auth.js');

//Rotas para controle e autenticação de usuários
//Rota de cadastro de usuário
routes.post('/signup', UserController.signup);

//Rota para realizar autenticação de um usuário
routes.post('/login', AuthController.login);

//Rota para alterar informações de um usuário
routes.patch('/u/profile', AuthMiddleware, UserController.update);

//Rota para deletar um usuário do sistema
routes.delete('/u/delete', AuthMiddleware, UserController.delete);

//Rotas para controle de livros
//Rota para criar um livro
routes.post('/b/create', AuthMiddleware, BookController.create);

//Rota para visualizar infos do livro
routes.get('/b/:id/view', AuthMiddleware, BookController.view);
/*
//Rota para alterar informações de um livro
routes.patch('/b/:id/edit', AuthMiddleware, BookController.edit);
*/
//Rota para deletar um livro do sistema
routes.delete('/b/:id/delete', AuthMiddleware, BookController.delete);


module.exports = routes;