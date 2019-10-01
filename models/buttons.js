const mongoose = require('mongoose');
const config = require('../config');

const buttonSchema = new mongoose.Schema({
  
  materia: {
    type: String,
    required: true,
  },
  unidade: {
    type: Number,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const button = mongoose.model('button', buttonSchema);

module.exports = button;