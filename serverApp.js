// require
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var session = require('express-session');
var passport = require('passport');
var passportConfig = require('./auth/config/passport.js')
var io = require('socket.io');
// connect db
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/socketChat');
// Instantiate express
var app = express();
// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
// setup Session
// name session for reuse in socket server config
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
});
app.use(app.sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);
app.use('/auth/process-login', routes);
app.use('/auth/process-signup', routes);
app.use('/auth/ensure', routes);
app.use('/api/me', routes);


// server
var port = 3000;
// app.listen returns http server object
app.server = app.listen(port, function(){
	console.log('server is listening on port ' + port);
});

//set up socketServer, use http server object as argument 
var socketServer = io(app.server);
socketServer.use(function(socket, next){
  if (socket.request.headers.cookie) return next();
  next(new Error('Authentication error'));
});

// analogous to app.use(session({}))
socketServer.use(function(socket, next){
	app.sessionMiddleware(socket.request, {}, next);
});

// connected users object
var connectedUsers = {};
var allMessages = [];

// "socket" is a 1:1 server:client connection
// "socketServer" is server:allClients
// socketServer event handling
// analogous to routing
socketServer.on('connection', function(socket){
	if ( socket.request.session && socket.request.session.passport && socket.request.session.passport.user ) {
		console.log(socket.request.session.passport.user + ' connected');
		socket.emit('server-send', allMessages);

		socket.on('client-send', function(message){
			allMessages.push(message);
			socketServer.emit('server-send', allMessages);
		});


		socket.on('disconnect', function(){
			console.log('user disconnected');
		});
	};
});


