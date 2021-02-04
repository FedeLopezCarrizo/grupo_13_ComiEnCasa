const express = require('express');
const router = express.Router();

const apiAxiosProductsController = require('../../../controllers/api/productsController');

router.get('/', apiAxiosProductsController.all);
router.get('/:idProduct', apiAxiosProductsController.detail);


module.exports = router;