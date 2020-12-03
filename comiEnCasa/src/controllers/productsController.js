const fs = require('fs');
const path = require('path');

const productsfilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsfilePath, { encoding:'utf-8' } ));

const controller = {
	all: (req, res) => {
		res.render('products/products', { products });
	},

	store: (req, res) => {
		res.render('products/productCart');
	},
	
	detail: (req, res) => {
		let idProduct = req.params.idProduct;

		let productToView = products.find(product => product.id == idProduct);
		res.render('products/productDetail', { productToView: productToView });
	},
	create: (req, res) => {
		res.render('products/productCreate');
	}, 
	createProduct: (req, res, next) => {		
		try {
			let newProduct = {
				id: products[products.length-1].id + 1,
				...req.body, 
				images: req.files[0].filename
			}
			
			let newProductJSON = JSON.stringify([...products, newProduct], null, 2);
	
			fs.writeFileSync(productsfilePath, newProductJSON);
			res.redirect('/products');
            
        } catch (error) {
            console.log(error);
        }
	}, 
	edit: (req, res) => {
		let idProduct = req.params.idProduct;
		let productToEdit = products.find(product => product.id == idProduct);

		res.render('products/productEdit', { productToEdit: productToEdit });
	}, 
	update: (req, res, next) => {
			
		for (product of products) {
			if (product.id == req.params.idProduct){
				product.name = req.body.name; 
				product.price = req.body.price;
				product.discount = req.body.discount;
				product.category = req.body.category;
				product.description = req.body.description;
				product.images = req.files[0].filename;				
			}
		}

		let newProductJSON = JSON.stringify(products, null, 2);
	
		fs.writeFileSync(productsfilePath, newProductJSON);
		res.redirect('/products');
	}, 
	delete: (req, res, next) => {	
		let idProduct = req.params.idProduct;
		let productToDelete = products.find(product => product.id == idProduct);

		res.render('products/productDelete', { productToDelete: productToDelete });
	},
	deleteProduct: (req, res, next) => {	
		let removeProduct = products.filter(product => product.id != req.params.idProduct);
		let newProductJSON = JSON.stringify(removeProduct, null, 2);
	
		fs.writeFileSync(productsfilePath, newProductJSON);
		res.redirect('/products');
	}

};

module.exports = controller;