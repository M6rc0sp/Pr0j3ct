const mongoose = require('mongoose');
const config = require('../config');
var uri = process.env.MONGOLAB_URI;
console.log(uri)

const postSchema = new mongoose.Schema({
	titulo: {
		type: String,
    	required: true,
	},
	texto: {
		type: String,
		required: true,
	},
	img: { type: String},
});

mongoose.connect(`${uri}`, { useNewUrlParser: true });
const post = mongoose.model('post', postSchema);

module.exports = post;