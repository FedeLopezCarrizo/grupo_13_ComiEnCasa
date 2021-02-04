const express = require('express');
const router = express.Router();

const apiProductsController = require('../../controllers/api/productsController');

router.get('/', apiProductsController.all);
router.get('/:idProduct', apiProductsController.detail);


module.exports = router;