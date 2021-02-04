const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");

//esto lo uso cuando lo tengo en JSON
/* const productsfilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsfilePath, { encoding:'utf-8' } )); */

const {Product, Category, Item, User, sequelize} = require('../database/models');
const db = require('../database/models');

const controller = {
	all: async (req, res) => {
		try {
			const products = await Product.findAll();
			res.render('products/products', { products });
		} catch (error) {
			console.log(error);
		}
	},	
	detail: async (req, res) => {
		try {		
			//esto es con json
			/* let idProduct = req.params.idProduct; */
			/* let productToView = products.find(product => product.id == idProduct); */
			
            const productToView = await Product.findByPk(req.params.idProduct);
			
			res.render('products/productDetail', { productToView: productToView });
		} catch (error) {
			console.log(error);
		}
	},
	create: async (req, res) => {
		try {
			const categorias = await Category.findAll();
			res.render('products/productCreate', { categorias });
		} catch (error) {
			console.log(error);
		}
	}, 
	createProduct: async (req, res, next) => {		
		try {
			let errors = validationResult(req);
	
			if (errors.isEmpty()){
				let newProductBody = {
					...req.body, 
					image: req.files[0].filename
				}
				
				//esto es cuando trabajo en JSON
				/* let newProductJSON = JSON.stringify([...products, newProduct], null, 2);
		
				fs.writeFileSync(productsfilePath, newProductJSON); */
				
				const newProduct = await Product.create(newProductBody);
				await newProduct.addCategories(req.body.category);
				res.redirect('/products');
			} else {
				const categorias = await Category.findAll();
				return res.render('products/productCreate', { categorias, errors: errors.errors, old: req.body });
			}
            
        } catch (error) {
            console.log(error);
        }
	}, 
    search: async (req, res, next) => {
        try {
            const productsSearch = await Product.findAll({
				where: {
					name: {[db.Sequelize.Op.like] : '%' + req.body.keywords + '%'}
				}
			});
		
        	res.render('products/productSearch', { productsSearch });
        } catch (error) {
            console.log(error);
        }
    }, 
	edit: async (req, res) => {
		try {
			const idProduct = req.params.idProduct;
			//esto era JSON
			/* let productToEdit = products.find(product => product.id == idProduct); */
	
            const productToEdit = await Product.findByPk(idProduct, { include: ['categories']});
			const categorias = await Category.findAll();
			
            res.render('products/productEdit', { productToEdit, categorias });
			
		} catch (error) {
            console.log(error);
		}
	}, 
	update: async (req, res, next) => {
		try {		
			/* for (product of products) {
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
			res.redirect('/products'); */

			const productId = req.params.idProduct;
			let updateProductBody = {
				...req.body, 
				image: req.files[0].filename
			}
            const updateProduct = await Product.findByPk(productId, { include:['categories'] });
            
            await updateProduct.removeCategories(updateProduct.categories);
            await updateProduct.addCategories(req.body.category);
            await updateProduct.update(updateProductBody);

			res.redirect('/products/' + productId);
		} catch (error) {
            console.log(error);
		}
	}, 
	delete: async (req, res, next) => {	
		try {
			let idProduct = req.params.idProduct;
			const productToDelete = await Product.findByPk(idProduct, { include: ['categories']});
			const categorias = await Category.findAll();
	
			res.render('products/productDelete', { productToDelete, categorias });
		} catch (error) {
            console.log(error);
		}
	},
	deleteProduct: async (req, res, next) => {	
		try {
			//cuando era en JSON
			/* let removeProduct = products.filter(product => product.id != req.params.idProduct);
			let newProductJSON = JSON.stringify(removeProduct, null, 2);
		
			fs.writeFileSync(productsfilePath, newProductJSON); */

			const productId = req.params.idProduct; 
            const deleteProduct = await Product.findByPk(productId,{include: ['categories'] });
            await deleteProduct.removeCategories(deleteProduct.categories);
            deleteProduct.destroy({
                where: {
                    id: productId
                }
            }); 
			res.redirect('/products');
		} catch (error) {
            console.log(error);
		}
	},
	store: async (req, res) => {
		try {
			const usersEncontrado = await User.findAll({
				where: {
					email: req.session.usuario					
				}
			});

			const itemsEncontrado = await Item.findAll({
				where: {
					userId: usersEncontrado[0].id,
					state: 1				
				},
				include: {
					all: true,
					nested: true
				}
			});

			let total = itemsEncontrado.reduce((total,item)=> (total = total + Number(item.subtotal)),0)

			res.render(path.resolve(__dirname, '..','views','products','productCart'), { cartProducto: itemsEncontrado , total });
			
		} catch (error) {
			console.log(error);
		}
	},
	addCart: async (req, res, next) => {
		try {
			const productAdd = await Product.findByPk(req.body.productId, { include: ['categories']});
			let cantidad = 1;
			let price = productAdd.discount > 0 ?
                Number(productAdd.price) - Number(productAdd.price * (productAdd.discount / 100)) : Number(productAdd.price)

			const usersEncontrado = await User.findAll({
				where: {
					email: req.session.usuario					
				}
			});
			
			let newItem = {
				salePrice : price,
				quantity : cantidad,
				subtotal : cantidad * price,
				state: 1,
				userId: usersEncontrado[0].id,
				productId: productAdd.id,
				cartId: null
			}
				
			await Item.create(newItem);
			
			res.redirect('/products');

		} catch (error) {
			console.log(error);
		}
	},
	deleteItemCart: async (req, res, next) => {
		try {
			const usersEncontrado = await User.findAll({
				where: {
					email: req.session.usuario					
				}
			});

			await Item.destroy({
				where: {
					productId : req.body.itemId,
					userId: usersEncontrado[0].id,
					cartId: null
				}
			});

			res.redirect('/products/store');
		} catch (error) {
			console.log(error);
		}
	}

};

module.exports = controller;