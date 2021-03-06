// loginController
angular.module('chatApp')
	.controller('loginController', ['$http', function($http){

		var loginCtrl = this;

		loginCtrl.processLogin = function(){
			$http({
				method: 'post',
				url: '/auth/process-login', 
				data: loginCtrl.loginForm
			}).then(function(returnData){
				console.log(returnData.data);
				window.location.href="/#/chat"				
			}, function(err){
				console.log(err);
			});

		};

		loginCtrl.signup = function(){
			$http({
				method: 'post',
				url: '/auth/process-signup', 
				data: loginCtrl.signupForm
			}).then(function(returnData){
				if(returnData.data.success) window.location.href="/#/chat";			
			}, function(err){
				console.log(err);
			});
		};


		
	}]);