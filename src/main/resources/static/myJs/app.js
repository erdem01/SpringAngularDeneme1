(function() {
	var module = angular.module('NgModelModule', []);
	module.controller('NgModelCtrl', ['$log', '$http', 'MyService', function($log, $http, MyService) {
		var self = this;
		self.variable = '12';
		self.submit = function() {
			$log.log("submitted name " + self.user.name + " surname " + self.user.surname);
		}
		self.list = MyService.list();
		self.addItem = function() {
			var newItem = {
				id: 3, label: 'Item 3'
			};
			MyService.add(newItem);
		};
		self.user = {};
		$http.get("/user").then(function(response) {
			self.user = response.data;
			self.user.birthday = new Date(self.user.birthday); 
		}, function(errResponse) {
			$log.log('Error while fetching users');
		});
	}]);
	module.factory('MyService', function() {
		var items = [
			{id: 1, label: 'Item 0'},
			{id: 2, label: 'Item 1'}
		];
		return {
			list: function() {
				return items;
			},
			add: function(item) {
				items.push(item);
			}
		};
	});
})();