const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

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

router.get('/store', productsController.store); 

router.get('/create', productsController.create)
router.post('/create', upload.any(), productsController.createProduct);

router.get('/edit/:idProduct', productsController.edit);
router.put('/edit/:idProduct', upload.any(), productsController.update);

router.get('/delete/:idProduct', productsController.delete);
router.delete('/delete/:idProduct', productsController.deleteProduct);

/* Get one product */
router.get('/:idProduct', productsController.detail);


module.exports = router;