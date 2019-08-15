var express = require('express');
var app = express();
var cors = require("cors");

app.use(cors());

const route = require('./router/route')

app.get('/', function(req, res) {
  res.send('Olá Mundo!');
});

app.get('/admin', route);

app.listen(3001, function() {
  console.log('App de Exemplo escutando na porta 3001!');
});

module.exports = app;