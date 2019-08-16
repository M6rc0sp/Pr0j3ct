var express = require('express');
var router = express.Router();
var json = require('../teste.json')

router.get('/admin', function(req, res) {
  res.send(json);
  console.log(json);
});

module.exports = router;