const productsResource = require('../../../requests/productsResource');

const controller = {
	all: async (req, res) => {
        let products = await productsResource.all;
        
        res.json(products.data);
    }, 
    detail: async (req, res) => {
		let idProduct = req.params.idProduct;
        let productOne = await productsResource.detail(idProduct);

        res.json(productOne.data);
    }
};

module.exports = controller;