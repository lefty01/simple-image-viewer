var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/doorcamusers';
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  userid: {type: String, unique:true},
  passwd: String,
  email:  {type: String, unique:true},
  lastLogin: Date
});

userSchema.plugin(passportLocalMongoose);

// make a connection
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

