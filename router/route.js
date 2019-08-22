var express = require('express');
var router = express.Router();
var model = require('../models/model');
var intro = require('../models/intro');

router.post('/intro', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
    const data = new model({
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

router.get('/intro', async (req, res) => {
  const modeljson = await model.find({});
  console.log(modeljson);
  let site = [];
  for (var i in modeljson) {
    site.push({ titulo: modeljson[i].titulo, texto: modeljson[i].texto })
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

router.put('/intro', async (req, res) => {
  console.log("aqui começa ", req.body)
  const modelData = await model.find({});
  modelData[0].titulo = req.body.titulo;
  modelData[0].texto = req.body.texto;
  modelData.save();
  console.log(modelData);
  
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;