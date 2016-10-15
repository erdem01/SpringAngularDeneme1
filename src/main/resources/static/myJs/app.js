(function() {
	var module = angular.module('NgModelModule', []);
	module.controller('NgModelCtrl', ['$log', function($log) {
		var self = this;
		this.variable = '12';
		this.submit = function() {
			$log.log("submitted name " + self.user.name + " surname " + self.user.surname);
		}
	}]);
})();