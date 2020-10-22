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

router.get('/store', productsController.store); 

/* Get one product */
router.get('/detail', productsController.detail);

router.get('/create', productsController.create)
router.post('/create', upload.any(), productsController.createProduct);

router.get('/edit/:idProduct', productsController.edit);
router.put('/edit', upload.any(), productsController.update);


module.exports = router;