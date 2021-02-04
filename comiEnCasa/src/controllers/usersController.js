const { validationResult } = require("express-validator");
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
/* const usersfilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersfilePath, { encoding:'utf-8' } )); */

const {TypeDocument, Role, User, sequelize} = require('../database/models');
const db = require('../database/models');

function compararPass(password,hash) {
	return bcrypt.compareSync(password,hash);
}

const controller = {
	login: (req, res) => {
		res.render('users/login');
	},
	processLogin: async (req, res, next) => {
		try {
			let errors = validationResult(req);

			if (errors.isEmpty()){
				const usersEncontrado = await User.findAll({
					where: {
						email: req.body.email					
					}
				});
				let usersPass = compararPass(req.body.password, usersEncontrado[0].password);

				if (usersPass){
					req.session.usuario = usersEncontrado[0].email;
					if (req.body.recordame != undefined){
						// acá estoy creando la cookie
						res.cookie("recordame", usersEncontrado[0].email, { maxAge: 1000 * 60 * 60 * 24 })
					}
			
					res.redirect('../products');
				}
				else{
					const errorIngreso = [
							{
							  "msg": "El usuario o password es incorrecto"
							}
					];
					return res.render('users/login', { errors: errorIngreso, old: req.body });
				}
			} else {
				return res.render('users/login', { errors: errors.errors, old: req.body });
			}
		} catch (error) {
			console.log(error);
		}
	},
	logout: (req, res) => {
		req.session.destroy();
		res.clearCookie("recordame");
		res.redirect('/');
	},
	register: async (req, res) => {
		try {
			const typedocuments = await TypeDocument.findAll();
			const roles = await Role.findAll();
			res.render('users/register', { typedocuments, roles });
		} catch (error) {
			console.log(error);
		}
	}, 
	store: async (req, res, next) => {
		try {
			let errors = validationResult(req);
	
			if (errors.isEmpty()){
				let passwordHash = bcrypt.hashSync(req.body.password, 10);
				let newUserBody = {
					firstName: req.body.firstName, 
					lastName: req.body.lastName,
					userName: req.body.userName,
					email: req.body.email,
					password: passwordHash,
					image: req.files[0].filename,
					phoneNumber: req.body.phoneNumber,
					typeDocId: req.body.typedocument,
					numberDoc: req.body.numberDoc,
					address: req.body.address,
					cityId: null
				}

				const newUser = await User.create(newUserBody);
				await newUser.addRoles(req.body.role);
				res.redirect('/users/login');
			} else {
				const typedocuments = await TypeDocument.findAll();
				const roles = await Role.findAll();
				return res.render('users/register', { typedocuments: typedocuments, roles, errors: errors.errors, old: req.body });
			}
		} catch (error) {
			console.log(error);
		}
	},
	edit: async (req, res) => {
		try {
			const idUser = req.params.idUser;
	
			const userToEdit = await User.findByPk(idUser, { include: ['TypeDocument', 'roles']});
			const typeDocuments = await TypeDocument.findAll();
			const roles = await Role.findAll();
			
            res.render('users/userEdit', { userToEdit, typeDocuments, roles });
			
		} catch (error) {
            console.log(error);
		}
	}, 
	update: async (req, res, next) => {
		try {	
			let errors = validationResult(req);
			const userId = req.params.idUser;
	
			if (errors.isEmpty()){
				let passwordHash = bcrypt.hashSync(req.body.password, 10);	
				let updateUserBody = {
					firstName: req.body.firstName, 
					lastName: req.body.lastName,
					userName: req.body.userName,
					email: req.body.email,
					password: passwordHash,
					image: req.files[0].filename,
					phoneNumber: req.body.phoneNumber,
					typeDocId: req.body.typedocument,
					numberDoc: req.body.numberDoc,
					address: req.body.address,
					cityId: null
				}
				const updateUser = await User.findByPk(userId, { include:['TypeDocument', 'roles'] });
				
				await updateUser.removeRoles(updateUser.roles);
				await updateUser.addRoles(req.body.role);
				await updateUser.update(updateUserBody);

				res.redirect('/products');
			}else {
				const userToEdit = await User.findByPk(userId, { include: ['TypeDocument', 'roles']});
				const typeDocuments = await TypeDocument.findAll();
				const roles = await Role.findAll();
			
            	return res.render('users/userEdit', { userToEdit, typeDocuments, roles, errors: errors.errors });
			}
		} catch (error) {
            console.log(error);
		}
	},
	detail: async (req, res) => {
		try {				
            const userToView = await User.findByPk(req.params.idUser);
			
			res.render('users/userDetail', { userToView: userToView });
		} catch (error) {
			console.log(error);
		}
	}
};

module.exports = controller;