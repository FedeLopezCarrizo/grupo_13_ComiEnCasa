module.exports = function(req, res, next){
    res.locals.usuario = false;

    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
    } else if (req.cookies.recordame) {
        res.locals.usuario = req.cookies.recordame;
    }

    next();
}