(function() {
	var module = angular.module('NgModelModule', []);
	module.controller('NgModelCtrl', ['UserService', 'MyService', function(UserService, MyService) {
		var self = this;
		self.variable = '12';
		self.list = MyService.list();
		self.addItem = function() {
			var newItem = {
				id: 3, label: 'Item 3'
			};
			MyService.add(newItem);
		};
		self.userPromise = UserService.gatherUser();
		self.user = {};
		self.userPromise.then(function(response) {
			self.user = response.data;
			self.user.birthday = new Date(self.user.birthday);
		});
		self.submit = function() {
			UserService.sendUser(self.user);
		}
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
	module.factory('UserService', ['$log', '$http', '$q', function($log, $http, $q) {
		var gatherUser = function() {
			return $http.get("/user");
		};
		var sendUser = function() {
			$http.post("/user", user);
		};
		return {
			gatherUser: gatherUser,
			sendUser: sendUser
		};
	}])
})();