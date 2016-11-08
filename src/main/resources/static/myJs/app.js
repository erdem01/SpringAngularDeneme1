(function() {
	var module = angular.module('NgModelModule', ['ngRoute']);
	module.value('Constant', {MAGIC_VALUE: 42});
	module.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/user/:uid', {
			templateUrl: 'template1.html',
			resolve: {
				immedieate: ['Constant', function(Constant) {
					return Constant.MAGIC_VALUE * 2;
				}],
				async: ['$http', function($http) {
					return $http.get('/user/12');
				}]
			},
			controller: ['$routeParams', '$log', 'immedieate', 'async', function($routeParams, $log, immedieate, async) {
				$log.log('Immedieate is : ', immedieate);
				$log.log('async is : ', async);
				this.id = $routeParams.uid;
				this.qStr = $routeParams.q;
				$log.log('wanted user id is: ', this.id);
				$log.log('q string is from url is : ', this.qStr, ' (Ex: q=123).');
			}]
		}).when('/', {
			templateUrl: 'template1.html',
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
			self.list = descIdFilter(MyService.list());
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
		self.itemTemplate = 'item.html';
		var currentTab='tab1';
		self.setCurrentTab = function(newTab) {
			currentTab = newTab;
		};
		self.getCurrentTab = function() {
			return currentTab;
		};
		self.onItemSelect = function(id) {
			console.log('item with id: ', id, '  selected');
		};
		
	}]);
	module.factory('MyService', function() {
		var items = [
			{id: 1, label: 'Item 0', price: 100, previous: 220},
			{id: 7, label: 'Item 7', price: 140, previous: 120},
			{id: 2, label: 'Item 1', price: 110, previous: 110}
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
			$http.get("/user/1").success(function(response) {
				 deferred.resolve(response);
			}).error(function(data, status, headers, config) {
				deferred.reject("Error: request returned status " + status);
			});
			return deferred.promise;
		};
		var sendUser = function() {
			$http.post("/saveUser", user);
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
	module.directive('itemRow', [function() {
		return {
			restrict: 'E',
			templateUrl: 'item.html',
			transclude: true,
			link: function($scope, $element, $attrs) {
				$scope.getChangeRate = function(item) {
					return Math.ceil(100*(item.price-item.previous)/item.previous);
				};
				$scope.onSelect = function() {
					$scope.selectAction({
						id: $scope.item.id,
						label: $scope.item.label
					});
				};
			},
			scope: {
				item: '=',
				message: '@',
				selectAction: '&'
			}
		};
	}]);
	module.directive('itemRowRepeat', [function() {
		return {
			restrict: 'A',
			transclude: 'element',
			link: function($scope, $element, $attrs, ctrl, $transclude) {
				var arrayToRender = $scope.$eval($attrs.itemRowRepeat);
				var generatedElement = angular.element("<div></div>");
				for (var int = 0; int < arrayToRender.length; int++) {
					var array_element = arrayToRender[int];
					var newElementToBeAdded = $transclude($scope.$new(),
						function(clonedElement, newScope) {
							newScope.currentIndex = int;
							newScope.item = array_element;
						});
					generatedElement.append(newElementToBeAdded);
				}
				$element.after(generatedElement);
			}
		};
	}]);
	module.directive('tabs', [function() {
		return {
			templateUrl: 'tabs.html',
			restrict: 'E',
			transclude: true,
			scope: {},
			controller: ['$scope', function($scope) {
				var tabs = [];
				$scope.selectTab = function(tab) {
					angular.forEach(tabs, function(tab) {
						tab.selected = false;
				    });
					tab.selected = true;
				};
				this.registerTab = function(tab) {
					if(tabs.length === 0) {
						$scope.selectTab(tab);
					}
					tabs.push(tab);
				};
			}]
		};
	}]);
	module.directive('tab', [function() {
		return {
			templateUrl: 'tab.html',
			restrict: 'E',
			transclude: true,
			require: '^^tabs',
			scope: {
		      title: '@'
		    },
			link: function(scope, element, attrs, tabsCtrl) {
				tabsCtrl.registerTab(scope);
			}
		};
	}]);
})();