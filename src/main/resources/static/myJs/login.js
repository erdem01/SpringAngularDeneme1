(function() {
	var module = angular.module('loginModule', []);
	module.controller('LoginCtrl', ['$http', '$log', function($http, $log) {
		var self = this;
		self.username = 'erdemc';
		self.password = 'invader84;';
		self.errorMessages=[];
		
		self.login = function() {
			var postData = {
					username: self.username,
					password: self.password
			};
			
			$http({
	            method: 'POST',
	            url: '/authenticate',
	            data: postData,
	            headers: {
	                "Content-Type": "application/x-www-form-urlencoded",
	                "X-Login-Ajax-call": 'true'
	            }
	        })
	        .then(function(response) {
                if (response.data == 'ok') {
                    window.location.replace('/index2.html');
                }
                else {
                    self.errorMessages.push({description: 'Access denied'});
                }
            });
		}
	}]);
})();