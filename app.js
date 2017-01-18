var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var topic = require('./routes/topic');
var auth = require('./routes/auth');

var otherApi = require('./routes/api');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieSession = require('cookie-session')
var session = require('express-session');
var app = express();
// app.use(cookieSession({
//   name: 'session',
//   keys: [/* secret keys */],

//   // Cookie Options
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }))
app.get('/login', function(req, res) {
  res.sendfile('public/login.html');
});
console.log("Server Started");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.session());
app.use(express.static(path.join(__dirname, 'public')));



app.use(passport.initialize());
app.use(passport.session());
app.use('/api/topic', topic);
app.use('/api/auth', auth);
app.use('/api', otherApi);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: err.message});
});

module.exports = app;
