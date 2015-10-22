// require
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes/routes.js');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')
var session = require('express-session')

// setup Session
app.sessionMiddleware = session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
});
app.use(app.sessionMiddleware);

// app config
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

app.use('/', routes)



// server
var port = 3000;
app.server = app.listen(port, function(){
	console.log('server is listening on port ' + port);
});

var socketServer = io(app.server);

socketServer.use(function(socket, next){
	app.sessionMiddleware(socket.request, {}, next);
});

socketServer.on('connection', function(socket){
	console.log('a user connected');


	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});


