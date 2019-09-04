const mongoose = require('mongoose');
const config = require('../config');
var uri = process.env.MONGOLAB_URI;
console.log(uri)

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

mongoose.connect(`${uri}`, { useNewUrlParser: true });
const intro = mongoose.model('intro', introSchema);

module.exports = intro;