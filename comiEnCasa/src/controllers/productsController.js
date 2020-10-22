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
	create: (req, res) => {
		res.render('products/productCreate');
	}, 
	createProduct: (req, res, next) => {
		let newProduct = {
			id: products[products.length-1].id + 1,
			...req.body, 
			images: req.files[0].filename
			/* name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			lunch: req.body.lunch, 
			description: req.body.description, 
			image: req.file.filename */
		}

		console.log(req.file);

		let newProductJSON = JSON.stringify([...products, newProduct], null, 2);

		fs.writeFileSync(productsfilePath, newProductJSON);
		res.redirect('/products/detail');
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
		console.log(req.params);
		let productFind = products.find(product => product.id == req.params.idProduct);
		console.log('llego?');
		res.render(productFind);
	}

};

module.exports = controller;