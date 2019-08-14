var express = require('express');
var router = express.Router();
var fs = require('fs');
var json = require('./test/1.txt')

router.get('/admin', function(req, res) {
  res.send(json);
});

module.exports = router;