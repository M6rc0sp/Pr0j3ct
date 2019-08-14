var express = require('express');
var app = express();

const route = require('./route')

app.get('/', function(req, res) {
  res.send('Olá Mundo!');
});

app.get('/admin', route);

app.listen(3000, function() {
  console.log('App de Exemplo escutando na porta 3000!');
});

module.exports = app;