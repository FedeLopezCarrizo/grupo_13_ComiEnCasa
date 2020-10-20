let fs = require('fs');

const controller = {
	store: (req, res) => {
		res.render('products/productCart');
	},
	
	detail: (req, res) => {
		res.render('products/productDetail');
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
	}

};

module.exports = controller;