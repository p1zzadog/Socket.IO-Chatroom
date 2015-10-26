var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// var User = require('../models/user.js');

// TEMPORARY CODE, THIS WILL GO IN /MODELS/USERS.JS
var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});
var User = mongoose.model('user', userSchema);
// 

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

localStrategy = new LocalStrategy(
	function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // this is where bcrypt compare password occurs
      // NEED TO USE BCRYPT COMPARE
      if (!user.password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
);

module.exports = {

  localStrategy : localStrategy

}