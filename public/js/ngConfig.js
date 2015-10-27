// instatiate
angular.module('chatApp', ['ui.router', 'ngMaterial'])

// configure
angular.module('chatApp')
	.config(['$stateProvider', '$mdThemingProvider', function($stateProvider, $mdThemingProvider){
			$stateProvider
				.state('auth', {
					url         : '/auth/login',
					templateUrl : 'html/views/login.html',
					controller  : 'loginController as loginCtrl',
				})
				.state('chat', {
					url         : '/chat',
					templateUrl : 'html/views/chat.html',
					controller  : 'chatController as chatCtrl',
				})

			$mdThemingProvider.theme('default')
				.primaryPalette('indigo')
       			.accentPalette('grey')
        		.warnPalette('red');
	}]);

angular.module('chatApp')
	.service('authService', ['$http', function($http){
		
	}]);

angular.module('chatApp')
	.controller('mainController', ['$http', function($http){



	}]);
