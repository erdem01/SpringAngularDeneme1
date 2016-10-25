describe('app.js test', function() {
	var $scope;
	var $q;
	var deferred;
	var mockUserService;
	var ctrl;
	
	beforeEach(module('NgModelModule'));
	
	beforeEach(inject(function($controller, _$rootScope_, _$q_, UserService) {
		$scope = _$rootScope_.$new();
		$q = _$q_;
		deferred = _$q_.defer();
		spyOn(UserService, 'gatherUser').and.returnValue(deferred.promise);
		ctrl = $controller('NgModelCtrl', {
			$scope: $scope,
			UserService: UserService
	    });
	}));
	
	it('testing UserService', function() {
		var mockUser = {
			name: 'name',
			surname: 'testsurname',
			birthday: new Date()
		};
		deferred.resolve(mockUser);
		$scope.$apply();
		expect(ctrl.user.surname).toEqual(mockUser.surname);
	});
});