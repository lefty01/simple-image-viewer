// simple image viewer ...

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var session = require('express-session');
var mongoose = require('mongoose');

//console.log('database name: ' + nconf.get('database:name'));
//console.log('database host: ' + nconf.get('database:host'));
//console.log('database port: ' + nconf.get('database:port'));
//console.log(process.env.npm_package_name, process.env.npm_package_version);
//var progname = (typeof process.env.npm_package_name !== 'undefined') ? process.env.npm_package_name : "";
//var progver  = (typeof process.env.npm_package_name !== 'undefined') ? process.env.npm_package_version : "";
//var db = monk(database_host + ':' + database_port + '/' + database_name, function(err, db){

var db = require('./model/db');
var Users = mongoose.model('Users');

var routes = require('./routes/index');

var app = express();
app.set('view options', { pretty: true });

var sessionOpt = {
    secret: 'hund Cat maus',
    cookie: {},
    resave: false,
    saveUninitialized: false
};


// passport config
//passport.use(new LocalStrategy(Users.authenticate()));
passport.use(Users.createStrategy());
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session(sessionOpt));
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use(passport.session());


app.use('/', routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
