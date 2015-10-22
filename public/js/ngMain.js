// instatiate
angular.module('chatApp', ['ngRoute', 'ngMaterial'])

// configure
angular.module('chatApp')
	.config(['$routeProvider',
		function($routeProvider){
			$routeProvider.when('/', {
				templateUrl : './html/views/home.html',
				controller  : 'mainController as main'
			})
		}
	]);

// mainController
angular.module('chatApp')
	.controller('mainController', ['$http', function($http){
		var socket = io();
		
	}]);