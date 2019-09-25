const mongoose = require('mongoose');
const config = require('../config');

const introSchema = new mongoose.Schema({
	titulo: {
		type: String,
		required: true,
	},
	subtitulo: {
		type: String,
		required: true,
	}
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const intro = mongoose.model('intro', introSchema);

module.exports = intro;