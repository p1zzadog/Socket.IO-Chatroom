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
	.controller('mainController', ['$http', function($http){
		var socket = io();
		
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
		};

		
	}]);