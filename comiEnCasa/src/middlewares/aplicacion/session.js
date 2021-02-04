module.exports = function(req, res, next){
    console.log('La sesion es de ' + req.session.usuario);
    next();
}