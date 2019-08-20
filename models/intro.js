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

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const intro = mongoose.model('intro', introSchema);

module.exports = intro;