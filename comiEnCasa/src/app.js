var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
const session = require('express-session');

const middSession = require('./middlewares/aplicacion/session');
//Middleware para controlar si el usuario está logueado
const middLog = require('./middlewares/aplicacion/log');

const indexRouter = require('./routes/index'); //rutas index
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const apiProductsRouter = require('./routes/api/products');
const apiAxiosProductsRouter = require('./routes/api/axios/products');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'comiEnCasa',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride("_method"));

//Mis Middlewares
app.use(middSession);
app.use(middLog);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/api/products', apiProductsRouter);
app.use('/api/axios/products',apiAxiosProductsRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
