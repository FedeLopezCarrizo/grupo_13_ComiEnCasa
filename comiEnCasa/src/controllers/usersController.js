const { validationResult } = require("express-validator");

const controller = {
	login: (req, res) => {
		res.render('users/login');
	}, 

	register: (req, res) => {
		res.render('users/register');
	}, 

	store: (req, res) => {
		let errors = validationResult(req);

		if (errors.isEmpty()){
			return res.send('Todo perfecto');
		} else {
			return res.render('users/register', { errors: errors.errors });
		}
	},

	registerbusiness: (req, res) => {
		res.render('users/registerbusiness');
	}
};

module.exports = controller;