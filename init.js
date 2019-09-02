var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
const bodyParser = require('body-parser');

// ... other imports 
const path = require("path")

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// ...
// Right before your app.listen(), add this:
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "pr0ject", "public", "index.html"));
    console.log(path.join(__dirname, "pr0ject", "public", "index.html"))
});

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

//files upload by multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './pr0ject/public/img')
  },
  filename: function (req, file, cb) {
   cb(null, Date.now() + '-' +file.originalname+'.png')
  }
})

var upload = multer({ storage: storage })

app.post('/upload', upload.any(), (req, res) => {
  //upload(req, res, (err) => {
    console.log("let me in:", req.files)
        /* if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }*/
    return res.status(200).send(req.files)

 // })

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

var porta = process.env.PORT || 3001;
app.listen(porta);
console.log('App de Exemplo escutando na porta'+porta+'!');

module.exports = app;