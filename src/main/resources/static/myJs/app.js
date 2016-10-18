(function() {
	var module = angular.module('NgModelModule', []);
	module.controller('NgModelCtrl', ['$log', 'MyService', function($log, MyService) {
		var self = this;
		this.variable = '12';
		this.submit = function() {
			$log.log("submitted name " + self.user.name + " surname " + self.user.surname);
		}
		this.list = MyService.list();
		this.addItem = function() {
			var newItem = {
				id: 3, label: 'Item 3'
			};
			MyService.add(newItem);
		};
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