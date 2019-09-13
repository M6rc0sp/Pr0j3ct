var express = require('express');
var router = express.Router();
var intro = require('../models/intro');
var abs = require('../models/abstract');
var post = require('../models/post');
var email = require('../models/email');
var fs = require('fs');
var config = require('../config.js');

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

router.delete('/post', async (req, res) => {
  console.log('executed');
  try {
    console.log(req.body)
    let link = req.body.img
    console.log(link)
    const deletedService = await post.findByIdAndRemove(req.body.id);
    fs.unlinkSync(config.dir+'\\'+link, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    }); 
    if (!deletedService) {
      return res.sendStatus(404);
    }

    return res.sendStatus(204);
  } catch (err) {
    console.log(err);

    return res.sendStatus(500);
  }
});

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

router.post('/email', async (req, res) => {
  console.log("Aqui vem o req.body:");
  console.log(req.body);
    const data = new email({
      email: "123@abc.com",
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
    data.push({ email: postjson[i].email, permission: postjson[i].permission })
  }
  try {
    return res.status(201).json(data);
  } catch (err) {
    return res.sendStatus(500);
  }
});

module.exports = router;