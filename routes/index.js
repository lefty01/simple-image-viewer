var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Users = mongoose.model('Users');
var passport = require('passport');
var fs = require('fs');
var chokidar = require('chokidar');
//var crypto = require('crypto');
//var crypt = require('../mycrypt.js')

var watcher = chokidar.watch(path, 'file', {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 1
});


watcher.on('add', function(path) {
    console.log('File: ', path, 'has been added');
// symlink latest.jpg to path
// how to trigger page reload ... or actually update img.src content dynamically
});



var path = 'public/images';

// fixme: check for readdir error if path not exist ENOENT
function get_images(path, callback) {
  fs.readdir(path, function(err, items) {
    if (err) {
      console.log(err);
    } else {
	  for (var i=0; i<items.length; i++) {
        items[i] = 'images/' + items[i];
	    console.log(items[i]);
	  }
    }
    callback(err, items);
  });
};



router.get('/', function(req, res, next) {
  get_images(path, function(err, items) {
    if (! err) {
      var size = items.length;
	res.render('index', { title: 'Doorcam', images: items, numimages: size, user: req.user });
    }
  });
});



//router.get('/register', function(req, res) {
//    res.render('register', { });
//});

//router.post('/register', function(req, res) {
//  console.log('register user: ' + req.body.userid);
//  //crypt.saltHashPassword(req.body.passwd);
//
//  Users.register(new Users({ userid : req.body.userid }), req.body.passwd, function(err, account) {
//    if (err) {
//      console.log('register error: ' + err);
//      return res.render('register', { account : account, error: err });
//    }
//    console.log('user registered!');
//    res.redirect('/');
//  });
//});


router.get('/login', function(req, res, next) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('authenticated!!! user: ' + req.user);
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
