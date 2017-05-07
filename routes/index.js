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
	//console.log(items[i]);
      }
    }
    callback(err, items);
  });
};


function isAuthenticated(req, res, next) {
    if (req.user) {
	return next();
    }
    res.redirect('/');
}

function isAdmin(req, res, next) {
    if (req.user && (req.user.userid === 'admin')) {
	return next();
    }
    res.redirect('/');
}

router.get('/', function(req, res, next) {
  if (req.user) {
    get_images(path, function(err, items) {
      if (! err) {
        var size = items.length;
	res.render('index', { title: 'Doorcam', images: items, numimages: size, user: req.user });
      }
    });
  } else {
    console.log("no user logged in");
    res.render('index', { user: req.user });
  }
});



router.get('/login', function(req, res, next) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  console.log('authenticated!!! user: ' + req.user);
  res.redirect('/');
});

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/login');
});


router.delete('/remove/images/:file', function(req, res, next) {
    if (req.user && (req.user.userid === 'admin')) {
	console.log("deleting: " + req.params.file);
	// req.params.file -> validate!

	fs.unlink('public/images/' + req.params.file, function(err) {
	    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
            if (err) return console.log(err);
            console.log('file deleted successfully');
	});
    }
});


module.exports = router;
