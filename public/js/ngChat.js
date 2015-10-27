// chatController
angular.module('chatApp')
	.controller('chatController', ['$scope','$http', function($scope, $http){

		// auth check
		// not totally secure but not risking data dump
		// hackers could access chat template but can't actually interact without authenticated session
  		$http({
    		method : 'get',
     		url    : '/auth/ensure',
   		}).then(function(returnData){
        	console.log(returnData)
        	if ( returnData.data.failure ) {
        		console.log('auth failure');
        		window.location.href="/#/auth/login"
        	}
        	else {
      			console.log('auth success');
    		};
		});

		$http({
			method:'get',
			url: '/api/me'
		}).then(function(returnData){
			chatCtrl.user = returnData.data
			console.log('chatCtrl.user', chatCtrl.user);
		})

		var socket = io();		
		var chatCtrl = this;
		chatCtrl.allMessages = [];

		// utility functions
		var scrollChatBottom = function(messageArray) {
			var elem = document.getElementById('chat-window');
			elem.scrollTop = elem.scrollHeight;
		}

		// initial socket connection
		socket.on('connect', function(messageData){
			chatCtrl.allMessages = messageData;
			$scope.$apply();
			scrollChatBottom();	
		})

		// send message
		chatCtrl.send = function(){
			socket.emit('client-send', {message:chatCtrl.message, user:chatCtrl.user});
			chatCtrl.message = '';
		}

		// receive message
		socket.on('server-send', function(messageData){
			console.log('message was sent by', messageData)
			console.log('message was received');
			$scope.$apply(function(){
				chatCtrl.allMessages = messageData;
			});
			scrollChatBottom();		
		});		



}]);

