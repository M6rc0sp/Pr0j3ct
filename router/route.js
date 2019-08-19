var express = require('express');
var router = express.Router();
var json = require('../teste.json');
var introjson = require('../intro.json');

router.get('/admin', function(req, res) {
  res.send(json);
  console.log(json);
});

router.get('/intro', function(req, res) {
  res.send(introjson);
  console.log(introjson);
});

module.exports = router;