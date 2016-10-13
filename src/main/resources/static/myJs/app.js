(function() {
	var module = angular.module('NgModelModule', []);
	module.controller('NgModelCtrl', [function() {
		var self = this;
		this.variable = '12';
		this.submit = function() {
			console.log("submitted name " + self.user.name + " surname " + self.user.surname);
		}
	}]);
})();