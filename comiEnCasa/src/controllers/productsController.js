<<<<<<< HEAD
let fs = require('fs');
=======
const fs = require('fs');
const path = require('path');

const productsfilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsfilePath, { encoding:'utf-8' } ));
>>>>>>> fef1d5daf97616e028f5afe3f1b24d187202a188

const controller = {
	store: (req, res) => {
		res.render('products/productCart');
	},
	
	detail: (req, res) => {
		res.render('products/productDetail');
<<<<<<< HEAD
	},
	NewProduct: (req, res) => {
		let nuevoProducto = {
			tituloProducto: req.body.tituloProducto,
			Descripcion: req.body.Descripcion,
			tipo: req.body.tipo,
			precio: req.body.precio,
		}

		let nuevoProductoJSON = JSON.stringify(nuevoProducto);

		fs.writeFileSync('nuevoProducto.JSON',nuevoProductoJSON);

		res.render('products/NewProduct');
=======
	}, 
	edit: (req, res) => {
		let idProduct = req.params.idProduct;

		/* if (fileProduct != ""){
			product = JSON.parse(fileProduct);
		} */

		let productToEdit = products[idProduct];

		res.render('products/productEdit', { productToEdit: productToEdit });
	}, 
	update: (req, res, next) => {
		res.render(req.body);
>>>>>>> fef1d5daf97616e028f5afe3f1b24d187202a188
	}

};

module.exports = controller;