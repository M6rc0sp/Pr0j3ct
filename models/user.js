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

/**
 * Função responsável pela autenticação de usuários
 * Obs.: Caso não encontre usuários no banco de dados, 'user' possuirá valor 'null'
 * @param userName Nome do usuário
 * @param password Senha do Usuário
 * @param callback função que manipulará a resposta
 * @return callback com dois parâmetros: erro e o usuário do sistema
 */
userSchema.statics.authenticate = (user, password, callback) => {
	user.findOne({ user: user }, (err, user) => {
	  if (err) {
		return callback(err);
	  }
	  if (!user) {
		const error = new Error();
		error.status = 404;
		return callback(error);
	  }
	  if (password === user.password) {
		return callback(null, user);
	  }
	  const error = new Error();
	  error.status = 401;
	  return callback(error);
	  /* bcrypt.compare(password, user.password, function (err, result) {
		if (err) {
		  callback(err)
		}
		if (result === true) {
		  return callback(null, user)
		} else {
		  return callback()
		}
	  }) */
	});
  };

module.exports = user;