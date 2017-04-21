var express = require('express');
var router = express.Router();
var fs = require('fs');

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
      res.render('index', { title: 'Doorcam', images: items, numimages: size });
    }
  });

});

router.get('/images', function(req, res, next) {
    get_images(path, function(err, items) {
      if (! err) {
        res.send(items);
      }
      console.log('get /images error: ' + err);
    });
});

module.exports = router;
