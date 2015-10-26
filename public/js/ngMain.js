// instatiate
angular.module('chatApp', ['ngRoute', 'ngMaterial'])

// configure
angular.module('chatApp')
	.config(['$routeProvider', '$mdThemingProvider', function($routeProvider, $mdThemingProvider){
			$routeProvider
				.when('/', {
					templateUrl : 'html/views/home.html',
					controller  : 'mainController as mainCtrl'
				})
				.when('/login', {
					templateUrl : 'html/views/login.html',
					controller  : 'loginController as loginCtrl'
				})

			$mdThemingProvider.theme('default')
				.primaryPalette('indigo')
       			.accentPalette('grey')
        		.warnPalette('red');
	}]);

// mainController
angular.module('chatApp')
	.controller('mainController', ['$scope','$http', '$location', '$anchorScroll', function($scope, $http, $location, $anchorScroll){
		var socket = io();		
		var mainCtrl = this;
		mainCtrl.allMessages = [];

		// utility functions
		var scrollChatBottom = function(messageArray) {
			var elem = document.getElementById('chat-window');
  			elem.scrollTop = elem.scrollHeight;
		}

		// initial socket connection
		socket.on('connect', function(returnMessages){
			mainCtrl.allMessages = returnMessages;
			$scope.$apply();
			scrollChatBottom();	
		})

		// send message
		mainCtrl.send = function(){
			socket.emit('client-send', mainCtrl.message);
			mainCtrl.message = '';
		}

		// receive message
		socket.on('server-send', function(returnMessages){
			console.log('message was received');
			$scope.$apply(function(){
				mainCtrl.allMessages = returnMessages;
				console.log(mainCtrl.allMessages);
			});
			scrollChatBottom();		
		});		
	}]);

// loginController
angular.module('chatApp')
	.controller('loginController', ['$http', function($http){

		var loginCtrl = this;

		loginCtrl.login = function(){
			console.log(loginCtrl.loginForm)
			$http({
				method: 'post',
				url: '/auth/login', 
				data: loginCtrl.loginForm
			}).then(function(returnData){
				console.log(returnData.data);
			});

			return false;
		};



		
	}]);