const http = require('http');
const { dirname } = require('path');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(__dirname + '/backend/html/index.html');   
});

server.listen(port, hostname, () => {
    console.log('Server running at https://${hostname}:${port}/');
});