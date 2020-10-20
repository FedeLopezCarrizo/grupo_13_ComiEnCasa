const fs = require('fs');
const path = require('path');

const productsfilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsfilePath, { encoding:'utf-8' } ));

const controller = {
	store: (req, res) => {
		res.render('products/productCart');
	},
	
	detail: (req, res) => {
		res.render('products/productDetail');
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
	}
};

module.exports = controller;