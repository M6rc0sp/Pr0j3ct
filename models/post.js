const mongoose = require('mongoose');
const config = require('../config');

const postSchema = new mongoose.Schema({
	titulo: {
		type: String,
	},
	texto: {
		type: String,
		required: true,
	},
	img: { type: String },
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const post = mongoose.model('post', postSchema);

module.exports = post;