var express = require('express');
var router = express.Router();
var post = require('../models/post');
var intro = require('../models/intro');
var user = require('../models/user')

/*router.post('/session', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
    const data = new user({
      user: "123",
      password: "123",
    });

    try {
      const newModel = await data.save();
      return res.status(201).json(newModel);
    } catch (err) {
      return res.sendStatus(500);
    }

});*/

router.get('/admin', async (req, res) => {
  const introjson = await intro.find({});
  console.log(introjson);
  let titulo = introjson[0].titulo;
  let subtitulo = introjson[0].subtitulo;
  const data = {
    titulo: titulo,
    subtitulo: subtitulo
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/admin', async (req, res) => {
  console.log("aqui começa ", req.body)
  const introjson = await intro.find({});
  introjson[0].subtitulo = req.body.subtitulo;
  introjson[0].titulo = req.body.titulo;
  introjson[0].save();
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.post('/post', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
    const data = new post({
      titulo: "Título",
      texto: "Texto",
    });

    try {
      const newModel = await data.save();
      return res.status(201).json(newModel);
    } catch (err) {
      return res.sendStatus(500);
    }

});

router.get('/post', async (req, res) => {
  const postjson = await post.find({});
  console.log(postjson);
  let site = [];
  for (var i in postjson) {
    site.push({ titulo: postjson[i].titulo, texto: postjson[i].texto, id: postjson[i]._id })
  }
  const data = {
    site: site
  };
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/post', async (req, res) => {
  console.log("aqui começa ", req.body)
  let id = req.body.id;
  const postData = await post.find({});
  postData[id].titulo = req.body.titulo;
  postData[id].texto = req.body.texto;
  postData[id].save();
  console.log(postData);
  
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.delete('/post/', async (req, res) => {
  console.log('executed');
  try {
    console.log(req)
    const deletedService = await post.findByIdAndRemove(req.body.id);

    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

module.exports = router;