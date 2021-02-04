const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const validator = require('../middlewares/rutas/validator');

/* Controller Require */
const usersController = require('../controllers/usersController');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../public/images'))
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
   
var upload = multer({ storage: storage })

router.get('/login', usersController.login); 
router.post('/login', validator.login, usersController.processLogin);

router.get('/register', usersController.register);
router.post('/register', upload.any(), validator.register, usersController.store);

router.get('/edit/:idUser', usersController.edit);
router.put('/edit/:idUser', upload.any(), validator.register, usersController.update);

router.post('/logout', usersController.logout);

router.get('/:idUser', usersController.detail);

module.exports = router;
