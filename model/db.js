var mongoose = require('mongoose');
const fs    = require('fs');
const nconf = require('nconf');

nconf.file('imageview.conf');

const database_name = nconf.get('database:name');
const database_host = nconf.get('database:host');
const database_port = nconf.get('database:port');
const database_user = nconf.get('database:user');
const database_pwd  = nconf.get('database:pwd');


var dbURI = 'mongodb://' + database_user + ':' + database_pwd +
    '@' + database_host + ':' + database_port + '/' + database_name;
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
//console.log("mongo uri: " + dbURI);
//mongoose.Promise = global.Promise;
//assert.equal(query.exec().constructor, global.Promise);
mongoose.Promise = require('bluebird');

mongoose.set('useCreateIndex', true)

mongoose.connect(dbURI, {useNewUrlParser: true});

// Build/Compile Users models
mongoose.model('Users', userSchema);


mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error');//: ' + err);
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

