const controller = {
	store: (req, res) => {
		res.render('products/productCart');
	},
	
	detail: (req, res) => {
		res.render('products/productDetail');
	}
};

module.exports = controller;