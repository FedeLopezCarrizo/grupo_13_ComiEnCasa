const express = require('express');
const router = express.Router();
const validator = require('../middlewares/rutas/validator');

/* Controller Require */
const usersController = require('../controllers/usersController');

router.get('/login', usersController.login); 

router.get('/register', usersController.register);

router.get('/registerbusiness', usersController.registerbusiness);

router.post('/register', validator.register, usersController.store);

module.exports = router;
