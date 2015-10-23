// require
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io');
var session = require('express-session');
var passport = require('passport');

var passportConfig = require('./auth/config/passport.js')

// connect db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socketChat');

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes)
app.post('/auth/login', function(req, res){
	console.log(req.body)
	res.send('Okay!');
})

// setup Session
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
});
app.use(app.sessionMiddleware);

// server
var port = 3000;
app.server = app.listen(port, function(){
	console.log('server is listening on port ' + port);
});

var socketServer = io(app.server);

socketServer.use(function(socket, next){
	app.sessionMiddleware(socket.request, {}, next);
});

var connectedUsers = {};

socketServer.on('connection', function(socket){
	console.log('a user connected');

	socket.on('chat message', function(message){
		console.log(message);
		socket.emit('chat message', message);
	})


	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


