var express = require('express');
var router = express.Router();
var intro = require('../models/intro');
var abs = require('../models/abstract');
var post = require('../models/post');
var email = require('../models/email');
var auth = require('../models/user');
var button = require('../models/buttons');
var video = require('../models/videos');
var cloudinary = require('cloudinary').v2;


//header routes
router.get('/hdr', async (req, res) => {
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

router.put('/hdr', async (req, res) => {
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

//post routes
router.post('/post', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  const data = new post({
    titulo: "Título",
    texto: "Texto",
    img: "abc",
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
    site.push({ titulo: postjson[i].titulo, texto: postjson[i].texto, img: postjson[i].img, id: postjson[i]._id })
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
  postData[id].img = req.body.img;
  postData[id].save();
  console.log(postData);

  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

//cloudinary
cloudinary.config({
  cloud_name: 'hcrwup82g',
  api_key: '617566545441475',
  api_secret: 'mq3Srsu1bLe-pCi_gEewBVz1PqU'
});

router.delete('/post', async (req, res) => {
  console.log('executed');
  try {
    console.log(req.body)
    const deletedService = await post.findByIdAndRemove(req.body.id);
    if (!deletedService) {
      return res.sendStatus(404);
    } else {
      let link = req.body.img
      console.log(link)
      var l = link.split("/");
      var li = l[7].split('.')[0];
      console.log(li)
      cloudinary.uploader.destroy(li, function (result) { console.log(result) });
      return res.sendStatus(204);
    }
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

//abstract routes
router.get('/abs', async (req, res) => {
  const absjson = await abs.find({});
  console.log(absjson);
  let site = [];
  for (var i in absjson) {
    site.push({ titulo: absjson[i].titulo, texto: absjson[i].texto, img: absjson[i].img, id: absjson[i]._id })
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

router.put('/abs', async (req, res) => {
  console.log("aqui começa ", req.body)
  let id = req.body.id;
  const absData = await abs.find({});
  absData[id].titulo = req.body.titulo;
  absData[id].texto = req.body.texto;
  absData[id].img = req.body.img;
  absData[id].save();
  console.log(absData);

  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

//email routes
router.post('/email', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  const data = new email({
    email: req.body.email,
    permission: true,
  });

  try {
    const newModel = await data.save();
    return res.status(201).json(newModel);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get('/email', async (req, res) => {
  const emailjson = await email.find({});
  console.log(emailjson);
  let data = [];
  for (var i in emailjson) {
    data.push({ email: emailjson[i].email, permission: emailjson[i].permission, id: emailjson[i]._id })
  }
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/email', async (req, res) => {
  console.log("aqui começa ", req.body)
  let id = req.body.id;
  const eData = await email.find({});
  eData[id].email = req.body.email;
  eData[id].permission = req.body.permission;
  eData[id].save();
  console.log(eData);

  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.delete('/email', async (req, res) => {
  console.log('executed');
  try {
    console.log(req.body)
    const deletedService = await email.findByIdAndRemove(req.body.id);
    if (!deletedService) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//auth routes
router.put('/auth', async (req, res) => {
  console.log("aqui começa ", req.body)
  try {
    const usData = await auth.find({});
    if (req.body.password === usData[0].password) {
      usData[0].user = req.body.user;
      usData[0].password = req.body.newpass;
      usData[0].save();
      console.log(usData);
      return res.sendStatus(204);
    } else {
      return res.sendStatus('err');
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});

//buttons routes
router.get('/button', async (req, res) => {
  const bjson = await button.find({});
  console.log(bjson);
  let data = [];
  for (var i in bjson) {
    data.push({ materia: bjson[i].materia, unidade: bjson[i].unidade, id: bjson[i]._id })
  }
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/button', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  let mat = req.body.mat;
  const bData = await button.find({});
  let bBody = req.body.json
  console.log('u.send', bBody[mat]);
  console.log('bd.has', bData[mat]);
  bData[mat].materia = bBody[mat].materia;
  bData[mat].unidade = bBody[mat].unidade;
  try {
    bData[mat].save();
    console.log(bData);
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.post('/uni', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  let id = req.body.id;
  let arr = [];
  const bData = await button.find({});
  arr = bData[id].unidade;
  arr.push({})
  bData[id].unidade = arr;
  bData[id].save();
  console.log(bData);
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }

});

router.delete('/uni', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  let mat = req.body.mat;
  const bData = await button.find({});
  console.log('b', bData[mat].unidade);
  bData[mat].unidade.pop();
  console.log('a', bData[mat].unidade)
  bData[mat].save();
  console.log(bData);
  try {
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.post('/mat', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  const data = new button({
    materia: 'Matéria',
  });

  try {
    const newModel = await data.save();
    return res.status(201).json(newModel);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.delete('/mat', async (req, res) => {
  console.log('executed');
  try {
    console.log(req.body)
    const deletedService = await button.findByIdAndRemove(req.body.id);
    if (!deletedService) {
      return res.sendStatus(404);
    }
    return res.sendStatus(204);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

//videos routes
router.post('/video', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  const data = new video({
    tema: 'Tema',
  });

  try {
    const newModel = await data.save();
    return res.status(201).json(newModel);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.get('/video', async (req, res) => {
  const vjson = await video.find({});
  console.log(vjson);
  let data = [];
  for (var i in vjson) {
    data.push({ tema: vjson[i].tema, button: vjson[i].button, id: vjson[i]._id })
  }
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.put('/video', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
  let t = req.body.t;
  const vData = await video.find({});
  let vBody = req.body.json
  console.log('u.send', vBody[t]);
  console.log('bd.has', vData[t]);
  vData[t].tema = vBody[t].tema;
  vData[t].button = vBody[t].button;
  try {
    vData[t].save();
    console.log(vData);
    return res.sendStatus(204);
  } catch (err) {
    return res.sendStatus(500);
  }
});

router.delete('/video', async (req, res) => {
  console.log('executed');
  try {
    console.log(req.body)
    const deletedService = await video.findByIdAndRemove(req.body.id);
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