const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');
const usersfilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersfilePath, { encoding:'utf-8' } ));

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

	processLogin: (req, res) => {
		let usersEncontrado = users.find(user => user.email == req.body.email);

		req.session.usuario = usersEncontrado.email;

		if (req.body.recordame != undefined){
			// acá estoy creando la cookie
			res.cookie("recordame", usersEncontrado.email, { maxAge: 1000 * 60 * 2 })
		}

		res.redirect('../products/store');
	},

	registerbusiness: (req, res) => {
		res.render('users/registerbusiness');
	}
};

module.exports = controller;