const express = require("express");

const app = express();

//inicia o servidor
app.listen(3000);

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/backend/html/index.html');
});
