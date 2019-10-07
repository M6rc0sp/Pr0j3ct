const mongoose = require('mongoose');
const config = require('../config');

const videoSchema = new mongoose.Schema({

  tema: {
    type: String,
    required: true,
  },
    button: [{
      titulo: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    }]
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const video = mongoose.model('video', videoSchema);

module.exports = video;