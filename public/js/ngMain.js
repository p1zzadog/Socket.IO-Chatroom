// instatiate
angular.module('chatApp', ['ngRoute', 'ngMaterial'])

// configure
angular.module('chatApp')
	.config(['$routeProvider', function($routeProvider){
			$routeProvider
				.when('/', {
					templateUrl : 'html/views/home.html',
					controller  : 'mainController as mainCtrl'
				})
				.when('/login', {
					templateUrl : 'html/views/login.html',
					controller  : 'loginController as loginCtrl'
				})
	}]);

// mainController
angular.module('chatApp')
	.controller('mainController', ['$scope','$http', function($scope, $http){
		var socket = io();
		
		var mainCtrl = this;

		mainCtrl.allMessages;

		socket.on('connect', function(returnMessages){
			mainCtrl.allMessages = returnMessages;
			$scope.$apply();
		})

		mainCtrl.send = function(){
			socket.emit('client-send', mainCtrl.message);
			mainCtrl.message = '';
		}

		socket.on('server-send', function(returnMessages){
			console.log('message was received');
			$scope.$apply(function(){
				mainCtrl.allMessages = returnMessages;

			});
		})
		
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