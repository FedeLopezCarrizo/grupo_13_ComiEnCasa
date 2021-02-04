const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/rutas/validator');
const authMidd = require('../middlewares/rutas/auth');

/* Controller Require */
const productsController = require('../controllers/productsController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.all); 

router.get('/store', authMidd, productsController.store); 
router.post('/store', authMidd, productsController.addCart); 
router.post('/deleteItemCart', authMidd, productsController.deleteItemCart); 

router.get('/create', productsController.create)
router.post('/create', upload.any(), validator.product, productsController.createProduct);

router.get('/edit/:idProduct', productsController.edit);
router.put('/edit/:idProduct', upload.any(), validator.product, productsController.update);

router.get('/delete/:idProduct', productsController.delete);
router.delete('/delete/:idProduct', productsController.deleteProduct);

/* Get one product */
router.get('/:idProduct', productsController.detail);

router.post('/search', productsController.search);


module.exports = router;