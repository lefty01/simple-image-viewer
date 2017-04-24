var express = require('express');
var router = express.Router();
var fs = require('fs');
var chokidar = require('chokidar');

var path = 'public/images';

var watcher = chokidar.watch(path, 'file', {
    ignored: /[\/\\]\./,
    persistent: true,
    depth: 1
});


function new_image_added(path) {

}

watcher.on('add', function(path) {
    console.log('File: ', path, 'has been added');
// symlink latest.jpg to path
// how to trigger page reload ... or actually update img.src content dynamically
});


//app.get('/images/latest.jpg', function (req, res) {
//    res.sendfile(path.resolve('images/latest.jpg'));
//});

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
      res.render('index', { title: 'Doorcam', images: items, numimages: size });
    }
  });

});


module.exports = router;
