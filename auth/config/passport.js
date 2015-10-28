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

passport.use(localStrategy);

var ensureAuth = function(req, res, next){

  if(req.isAuthenticated()){
    return next()
  };
  res.redirect('/#/auth/login');
};

var ensureAuthAjax = function(req, res, next){

  if(req.isAuthenticated()){
    return next();
  }; 
  res.send({failure:"auth failure"});
}

module.exports = {
  ensureAuth    : ensureAuth,
  ensureAuthAjax : ensureAuthAjax,
}