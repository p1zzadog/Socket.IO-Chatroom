var express = require('express');
var router = express.Router();
var ensureAuth = require('../auth/config/passport.js').ensureAuth;
var ensureAuthAjax = require('../auth/config/passport.js').ensureAuthAjax;
var authControl = require('../auth/controllers/authController.js');

// view routes
router.get('/', function(req, res){
	res.sendFile('/html/index.html', {root: './public'})
});
// auth routes
router.post('/auth/process-login', authControl.processLogin); 
router.post('/auth/process-signup', authControl.processSignup);
router.get('/auth/ensure', ensureAuthAjax, function(req, res){
	res.send({success: "auth success"});
});
// api routes
router.get('/api/me', ensureAuthAjax, function(req, res){
	res.send({user:req.user});
});

module.exports = router;