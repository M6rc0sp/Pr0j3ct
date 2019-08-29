var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

//files upload by multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/img')
},
filename: function (req, file, cb) {
  cb(null, Date.now() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload', async function(req, res) {
  upload(req, res, function (err) {
    console.log(req.body.file)
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    return res.status(200).send(req.body)

  })

});

//my routes
const route = require('./router/route')
const auth = require('./router/auth')

app.get('/', function(req, res) {
  res.send('Olá Mundo!');
});

app.use('/auth', auth);
app.post('/auth', auth);
app.get('/auth', auth);

app.get('/admin', route);
app.put('/admin', route);

app.post('/post', route);
app.get('/post', route);
app.put('/post', route);
app.delete('/post', route)

app.listen(3001, function() {
  console.log('App de Exemplo escutando na porta 3001!');
});

module.exports = app;