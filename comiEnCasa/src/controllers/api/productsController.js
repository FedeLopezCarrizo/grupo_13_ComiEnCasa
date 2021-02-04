const fs = require('fs');
const path = require('path');

const productsfilePath = path.join(__dirname, '../../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsfilePath, { encoding:'utf-8' } ));

const controller = {
	all: (req, res) => {
        let cantidadRegistros = Object.keys(products).length;
        let respuesta;

        if (cantidadRegistros > 0){
            respuesta = {
                metadata:{
                    status:200,
                    cantidad:cantidadRegistros
                },
                resultados:products
            }
        }
        else{
            respuesta = {
                metadata:{
                    status:204
                },
                resultados:'La cantidad de registros es cero!!!'
            }
        }

        res.json(respuesta);
	},
	detail: (req, res) => {
		let idProduct = req.params.idProduct;
		let productToView = products.find(product => product.id == idProduct);
        let respuesta;
        
        if (productToView != null){
            respuesta = {
                metadata:{
                    status:200,
                },
                resultados:productToView
            }
        }
        else{
            respuesta = {
                metadata:{
                    status:204
                },
                resultados:'La cantidad de registros es cero!!!'
            }
        }

        res.json(respuesta);
    }
};

module.exports = controller;