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
routes.put('/u/profile/edit', AuthMiddleware, UserController.update);

//Rota para deletar um usuário do sistema
routes.delete('/u/profile/delete', AuthMiddleware, UserController.delete);

//Rotas para controle de livros
//Rota para criar um livro
routes.post('/b/create', AuthMiddleware, BookController.create);

//Rota para visualizar infos do livro
routes.get('/b/:id/view', AuthMiddleware, BookController.view);

//Rota para alterar informações de um livro
routes.put('/b/:id/edit', AuthMiddleware, BookController.edit);

//Rota para deletar um livro do sistema
routes.delete('/b/:id/delete', AuthMiddleware, BookController.delete);

//Rotas para entregar o frontend
/*
//Rota Página Index
routes.get('/');

//Rota Página Cadastro
routes.get("/signup");

//Rota Página de Login
routes.get('/login');

//Rota Página de Recuperação de Senha
routes.get('/recpass');

//Rota Página Home
routes.get('/home', AuthMiddleware, BookController.load);

//Rota Página Profile
routes.get('/u/profile', AuthMiddleware, UserController.userInfo);

//Rota Página Edit Profile
routes.get('/u/profile/edit', AuthMiddleware);

//Rota Página Delete Profile
routes.get('/u/profile/delete', AuthMiddleware);

//Rota Página de Criaçao de Livro
routes.get('/b/create', AuthMiddleware);

//Rota Página de Ediçao de Livro
routes.get('/b/:id/edit', AuthMiddleware);

//Rota Página de Deletar Livro
routes.get('/b/:id/delete', AuthMiddleware);

//Rota Página Ranking
routes.get('/ranking', AuthMiddleware);

//Rota Página Recomendações
routes.get('/recommendention', AuthMiddleware);

//Rota Página de Suporte
routes.get('/support');
*/
module.exports = routes;