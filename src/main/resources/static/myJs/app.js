(function() {
	var module = angular.module('NgModelModule', ['ngRoute']);
	module.value('Constant', {MAGIC_VALUE: 42});
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/', {
			templateUrl: 'template1.html',
			resolve: {
				immedieate: ['Constant', function(Constant) {
					return Constant.MAGIC_VALUE * 2;
				}],
				async: ['$http', function($http) {
					return $http.get('/user');
				}]
			},
			controller: ['$log', 'immedieate', 'async', function($log, immedieate, async) {
				$log.log('Immedieate is : ', immedieate);
				$log.log('async is : ', async);
			}]
		}).when('/second', {
			templateUrl: 'template2.html'
		}).otherwise({redirectTo: '/'});
	}]);
	module.controller('NgModelCtrl', ['UserService', 'MyService', 'descIdFilter', function(UserService, MyService, descIdFilter) {
		var self = this;
		self.variable = '12';
		self.list = descIdFilter(MyService.list());
		self.addItem = function() {
			var newItem = {
				id: 3, label: 'Item 3'
			};
			MyService.add(newItem);
		};
		self.user = {};
		self.userPromise = UserService.gatherUser();
		self.userPromise.then(function(response) {
			self.user = response;
			self.user.birthday = new Date(self.user.birthday);
		}, function(errorMessage) {
			alert(errorMessage);
		});
		self.submit = function() {
			UserService.sendUser(self.user);
		}
	}]);
	module.factory('MyService', function() {
		var items = [
			{id: 1, label: 'Item 0'},
			{id: 7, label: 'Item 7'},
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
			var deferred = $q.defer();
			$http.get("/user").success(function(response) {
				 deferred.resolve(response);
			}).error(function(data, status, headers, config) {
				deferred.reject("Error: request returned status " + status);
			});
			return deferred.promise;
		};
		var sendUser = function() {
			$http.post("/user", user);
		};
		return {
			gatherUser: gatherUser,
			sendUser: sendUser
		};
	}]);
	module.filter('descId', ['orderByFilter', function(orderByFilter) {
		return function(list) {
			return orderByFilter(list, '-id');
		};
	}]);
})();