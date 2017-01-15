describe('app.js test', function() {
	var $scope;
	var $q;
	var deferred;
	var mockUserService;
	var ctrl;
	var filter;
	
	beforeEach(module('NgModelModule'));
	
	beforeEach(inject(function($controller, _$rootScope_, _$q_, UserService, descIdFilter) {
		$scope = _$rootScope_.$new();
		$q = _$q_;
		deferred = _$q_.defer();
		spyOn(UserService, 'gatherUser').and.returnValue(deferred.promise);
		ctrl = $controller('NgModelCtrl', {
			$scope: $scope,
			UserService: UserService
	    });
		filter = descIdFilter;
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
	
	it('testing descIdFilter', function() {
		var list = [{id: 2}, {id: 3}, {id: 1}, {id: 4}, {id: 4}];
		var sortedList = filter(list);
		expect(list.length).toEqual(sortedList.length);
		var prevVal;
		for (var i = 0; i < sortedList.length; i++) {
			var curVal = sortedList[i];
			if(prevVal) {
				expect(prevVal.id >= curVal.id).toBeTruthy();
			}
			prevVal = curVal;
		}
	});
});