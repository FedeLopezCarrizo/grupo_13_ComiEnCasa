const { body } = require("express-validator");
const path = require("path");

module.exports = {
    login: [
        body('email')
            .notEmpty()
            .withMessage("El campo email es obligatorio")
            .isEmail()
            .withMessage("El campo email no corresponde a un email válido")
            .isLength({ max: 256 })
            .withMessage("El campo email tiene un máximo de 256 caracteres"),
        body('password')
            .notEmpty()
            .withMessage("El campo password es obligatorio")
    ],
    register: [
        body('firstName')
            .notEmpty()
            .withMessage("El campo de nombre es obligatorio")
            .isLength({ max: 256 })
            .withMessage("El campo nombre tiene un máximo de 256 caracteres"),
        body('lastName')
            .notEmpty()
            .withMessage("El campo de apellido es obligatorio")
            .isLength({ max: 256 })
            .withMessage("El campo apellido tiene un máximo de 256 caracteres"),
        body('userName')
            .notEmpty()
            .withMessage("El campo usuario es obligatorio")
            .isLength({ max: 256 })
            .withMessage("El campo usuario tiene un máximo de 256 caracteres"),
        body('email')
            .notEmpty()
            .withMessage("El campo email es obligatorio")
            .isEmail()
            .withMessage("El campo email no corresponde a un email válido")
            .isLength({ max: 256 })
            .withMessage("El campo email tiene un máximo de 256 caracteres"),
        body('password')
            .notEmpty()
            .withMessage("El campo password es obligatorio"),
        body('numberDoc')
            .notEmpty()
            .withMessage("El campo número de documento es obligatorio")
            .isLength({ max: 45 })
            .withMessage("El campo número de documento tiene un máximo de 45 caracteres"),
        body('address')
            .isLength({ max: 512 })
            .withMessage("El campo dirección tiene un máximo de 512 caracteres")
    ],
    product: [
        body("name")
            .notEmpty()
            .withMessage("El campo de nombre es obligatorio")
            .isLength({ max: 256 })
            .withMessage("El campo nombre tiene un máximo de 256 caracteres"),
        body("price")
            .notEmpty()
            .withMessage("El campo precio es obligatorio")
            .isFloat()
            .withMessage("El campo precio debe ser un número"),
        body("discount")
            .isFloat()
            .withMessage("El campo descuento debe ser un número"),   
        body("description")
            .notEmpty()
            .withMessage("El campo descripción es obligatorio")
            .isLength({ min: 10 })
            .withMessage("El campo descripción tiene un mínimo de 10 caracteres"),         
        /* body("image")
            .custom(function(value, {req}){
                console.log(req.file);
                if (req.file){
                    return true;
                }
                return false;
            })
            .withMessage("La imagen del producto es obligatoria")
            .bail()
            .custom(function(value, { req }){
                const acceptedExtensions = [".jpg", ".jpeg", ".png"];
                const ext = path.extname(req.file.originalname);
                return acceptedExtensions.includes(ext);
            })
            .withMessage("El archivo de imagen del producto no es válido"), */
        body("stock")
            .notEmpty()
            .withMessage("El campo stock es obligatorio")
            .isInt()
            .withMessage("El campo stock debe ser un número entero")
    ]
}