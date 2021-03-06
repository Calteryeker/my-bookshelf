const { Router } = require('express');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');
const BookController = require('./controllers/BookController');
const SupportController = require('./controllers/SupportController')
const routes = Router();

const AuthMiddleware = require('./middleware/auth.js');
const User = require('./models/User');

//Rotas para controle e autenticação de usuários
//Rota de cadastro de usuário
routes.post('/signup', UserController.signup);

//Rota para realizar autenticação de um usuário
routes.post('/login', AuthController.login);

//Rota para alterar informações de um usuário
routes.put('/u/profile/edit', AuthMiddleware, UserController.update);

//Rota para deletar um usuário do sistema
routes.delete('/u/profile/delete', AuthMiddleware, UserController.delete);

//Rota para recuperar as informações do usuário autenticado
routes.get('/user', AuthMiddleware, UserController.recUser);

//Rotas para controle de livros
//Rota para criar um livro
routes.post('/b/create', AuthMiddleware, BookController.create);

//Rota para visualizar infos do livro
routes.get('/b/:id/view', AuthMiddleware, BookController.view);

//Rota para alterar informações de um livro
routes.put('/b/:id/edit', AuthMiddleware, BookController.edit);

//Rota para alterar o estado de um livro
routes.patch('/b/:id/state', AuthMiddleware, BookController.updateState);

//Rota para deletar um livro do sistema
routes.delete('/b/:id/delete', AuthMiddleware, BookController.delete);

//Rota para recuperar os livros do usuário
routes.get('/b', AuthMiddleware, BookController.getBooks);

//Rota para registro de mensagens dos usuários
routes.post('/m', AuthMiddleware, SupportController.create);

//Rotas para testar disponibilidade cadastro
routes.post('/test/l', UserController.testLogin)
routes.post('/test/e', UserController.testEmail)

module.exports = routes;