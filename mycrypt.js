var express = require('express');
var crypto = require('crypto');


var genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length / 2))
         .toString('hex')   /** convert to hexadecimal format */
         .slice(0, length); /** return required number of characters */
};

var sha512 = function(password, salt){
  var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
  hash.update(password);
  var value = hash.digest('hex');
  return {
    salt:salt,
    passwordHash:value
  };
};

exports.saltHashPassword = function(passwd) {
  var salt = genRandomString(16); /** Gives us salt of length 16 */
  var passwordData = sha512(passwd, salt);

  console.log('UserPassword = ' + passwd);
  console.log('Passwordhash = ' + passwordData.passwordHash);
  console.log('Salt = ' + passwordData.salt);
}


exports.verifHashedPassword = function(passwd, salt) {
  var passwordData = sha512(passwd, salt);

  console.log('UserPassword = ' + passwd);
  console.log('Passwordhash = ' + passwordData.passwordHash);

  if (passwd === passwordData.passwordHash) { return True; }
  return False;
}

