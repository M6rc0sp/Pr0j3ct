const mongoose = require('mongoose');
const config = require('../config');

const modelSchema = new mongoose.Schema({
	titulo: {
		type: String,
    	required: true,
	},
	texto: {
		type: String,
		required: true,
	}
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const model = mongoose.model('model', modelSchema);

module.exports = model;