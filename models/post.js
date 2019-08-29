const mongoose = require('mongoose');
const config = require('../config');

const postSchema = new mongoose.Schema({
	titulo: {
		type: String,
    	required: true,
	},
	texto: {
		type: String,
		required: true,
	},
	img: { data: Buffer, contentType: String},
});

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const post = mongoose.model('post', postSchema);

module.exports = post;