describe('Item Row Directive Testing', function() {
	beforeEach(module('NgModelModule'));
	var compile, mockBackend, rootScope;
	beforeEach(inject(function($compile, $httpBackend, $rootScope) {
		compile = $compile;
		mockBackend = $httpBackend;
		rootScope = $rootScope;
	}));
	it('check if template rendered', function() {
		var newScope = rootScope.$new();
		newScope.testItem = {
			id: 22,
			label: 'testLabel'
		};
		mockBackend.expectGET('item.html').respond(
				'<div ng-bind="item.id"></div>' +
				'<div ng-bind="item.label"></div>');
		var htmlElement = compile('<item-row item="testItem"></item-row>')(newScope);
		newScope.$digest();
		mockBackend.flush();
		expect(htmlElement.html()).toEqual(
				'<div ng-bind="item.id" class="ng-binding">22</div>' +
				'<div ng-bind="item.label" class="ng-binding">testLabel</div>');
	});
});