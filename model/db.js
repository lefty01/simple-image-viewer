var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/doorcamusers';
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  userid: {type: String, unique:true},
  passwd: String,
  email:  String
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'userid',
  passwordField: 'passwd'
});

// make a connection
//mongoose.Promise = global.Promise;
//assert.equal(query.exec().constructor, global.Promise);
mongoose.Promise = require('bluebird');

mongoose.connect(dbURI);

// Build/Compile Users models
mongoose.model('Users', userSchema);


mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination (SIGINT)');
    process.exit(0);
  });
});

