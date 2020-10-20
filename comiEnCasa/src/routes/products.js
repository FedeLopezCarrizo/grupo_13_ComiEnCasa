const express = require('express');
const router = express.Router();

/* Controller Require */
const productsController = require('../controllers/productsController');

router.get('/store', productsController.store); 

/* Get one product */
router.get('/detail', productsController.detail);

router.get('/NewProduct', productsController.NewProduct)

module.exports = router;