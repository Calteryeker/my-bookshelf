const express = require("express");

const app = express();

//inicia o servidor
app.listen(3000);

//permite o uso do css e javascript das páginas
app.use(express.static(__dirname + '/frontend'));
//Adicionar rotas == app.get('/rota', (req,res) => {});
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/frontend/html/index.html');
});
