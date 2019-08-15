var express = require('express');
var router = express.Router();
var fs = require('fs');
var json = require('../package.json')

router.get('/admin', function(req, res) {
  res.send(json.dependencies.express);
  console.log(json.dependencies.express);
});

module.exports = router;