var mongoose = require('mongoose');
var dbURI = 'mongodb://localhost:27017/doorcamusers';

var userSchema = new mongoose.Schema({
  userid: String,
  passwd: String,
  email: {type: String, unique:true},
  lastLogin: Date
});


// make a connection
mongoose.connect(dbURI);

// Build/Compile User and Project models
mongoose.model('User', userSchema);


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
