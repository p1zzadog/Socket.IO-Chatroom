var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user.js');

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

var ensureAuthenticated = function(req, res, next){
  // If the current user is logged in...
  if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
    return res.send({success:"auth success"})
  };
  // If not, redirect to login
  res.send({failure:"auth failure"});
};

var ensureAuthenticatedAjax = function(req, res, next){
    // If the current user is logged in...
  if(req.isAuthenticated()){
    // Middleware allows the execution chain to continue.
    return next();
  };
  // If not, redirect to login
  res.send({failure:"auth failure"});
}

module.exports = {
  ensureAuthenticated     : ensureAuthenticated,
  ensureAuthenticatedAjax : ensureAuthenticatedAjax,
	localStrategy           : localStrategy,
}