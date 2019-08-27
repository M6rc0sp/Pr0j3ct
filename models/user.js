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

mongoose.connect(`mongodb://localhost/${config.database}`, { useNewUrlParser: true });
const user = mongoose.model('user', userSchema);

module.exports = user;