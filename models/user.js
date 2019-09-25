const mongoose = require('mongoose');
const config = require('../config');

const userSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	}
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const user = mongoose.model('user', userSchema);

module.exports = user;