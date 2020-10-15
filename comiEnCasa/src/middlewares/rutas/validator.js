const { body } = require("express-validator");

module.exports = {
    register: [
        body("name")
            .notEmpty()
            .withMessage("El campo de nombre es obligatorio")
            .isLength({ max: 100 })
            .withMessage("El máximo es de 100 caracteres")
    ]
}