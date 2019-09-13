var express = require('express');
var app = express();
var cors = require('cors');
var multer = require('multer');
const bodyParser = require('body-parser');

// ... other imports 
const path = require("path")

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(cors());

//files upload by multer
const storage = multer.diskStorage({
  destination: './pr0ject/public/img',
  filename(req, file, cb) {
   cb(null, Date.now() + '-' +file.originalname+'.png')
  }
})

const upload = multer({ storage })

app.post('/upload', upload.any(), (req, res) => {
    console.log("let me in:", req.files)
    res.status(200).send(req.files)
});

//my routes
const route = require('./router/route')
const auth = require('./router/auth')

app.use('/auth', auth);
app.post('/auth', auth);
app.get('/auth', auth);

app.use('/hdr', route);
app.put('/hdr', route);
app.get('/hdr', route);

app.use('/post', route);
app.get('/post', route);
app.post('/post', route);
app.put('/post', route);
app.delete('/post', route);

app.use('/abs', route);
app.get('/abs', route);
app.put('/abs', route);

app.use('/email', route);
app.get('/email', route);
app.put('/email', route);

/*Adds the react production build to serve react requests*/
app.use(express.static(path.join(__dirname, "/pr0ject/build")));
/*React root*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/pr0ject/build/index.html"));
});

var porta = process.env.PORT || 3001;
app.listen(porta);
console.log('App de Exemplo escutando na porta'+porta+'!');

module.exports = app;