const { User } = require('../../database/models');

module.exports = function(req, res, next){
    res.locals.usuario = false;
    res.locals.role = false;
    res.locals.avatar = false;
    res.locals.idUsuario = false;

    if(req.session.usuario){
        User.findAll({
            where: {
                email: req.session.usuario
            },
            include: ['roles']
        })
        .then(user => {
            res.locals.usuario = req.session.usuario;
            res.locals.role = user[0].roles;
            res.locals.avatar = user[0].image;
            res.locals.idUsuario = user[0].id;
        })
    } else if (req.cookies.recordame) {
        User.findAll({
            where: {
                email: req.cookies.recordame
            },
            include: ['roles']
        })
        .then(user => {
            req.session.usuario = req.cookies.recordame;
            res.locals.usuario = req.session.usuario;
            res.locals.role = user[0].roles;
            res.locals.avatar = user[0].image;
            res.locals.idUsuario = user[0].id;
        })
    }

    next();
}