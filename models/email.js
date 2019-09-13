const mongoose = require('mongoose');
const config = require('../config');

const emailSchema = new mongoose.Schema({
	email: {
		type: String,
    	required: true,
	},
	permission:{
		type: Boolean,
		required: true,
	}
});

mongoose.connect(`mongodb://heroku_8g99fd99:ja612kvpqutitn96tup42ic955@ds217438.mlab.com:17438/${config.database}`, { useNewUrlParser: true });
const email = mongoose.model('email', emailSchema);

module.exports = email;