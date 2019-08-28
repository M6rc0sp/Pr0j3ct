var express = require('express');
var app = express();
var cors = require("cors");
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

const route = require('./router/route')
const auth = require('./router/auth')

app.get('/', function(req, res) {
  res.send('Olá Mundo!');
});

app.post('/auth', auth);
app.get('/auth', auth);
app.use('/auth', auth);

app.post('/post', route);
app.get('/post', route);
app.put('/post', route);
app.delete('/post', route)

app.get('/admin', route);
app.put('/admin', route);

app.listen(3001, function() {
  console.log('App de Exemplo escutando na porta 3001!');
});

module.exports = app;