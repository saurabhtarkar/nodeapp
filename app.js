var express = require('express');
var path = require('path');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var routes = require('./routes');
//var controller = require('./controller/controller.js');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/UI'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views/UI')));

app.use('/', routes);
//app.use('/users', users);



// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
*/

// error handler
app.use(function(req, res, next) {
   // set locals, only providing error in development
   // Website you wish to allow to connect
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
   res.header("Access-Control-Max-Age","1728000");

   if ('OPTIONS' === req.method) 
	res.sendStatus(800);
   else 
	next();
});


module.exports = app;
