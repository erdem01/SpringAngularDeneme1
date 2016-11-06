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
	it('check if scope and functions are correct', function() {
		//Given
		var newScope = rootScope.$new();
		newScope.testItem = {
			id: 22,
			label: 'testLabel',
			price: 1001,
			previous: 1000
		};
		var clickedIdValue;
		var clickedLabelValue;
		newScope.itemClicked = function(id, label) {
			clickedIdValue = id;
			clickedLabelValue = label;
		}
		mockBackend.expectGET('item.html').respond(
				'<div ng-bind="item.id"></div>' +
				'<div ng-bind="item.label"></div>');
		var htmlElement = compile('<item-row item="testItem" message="my message {{testItem.label}}" select-action="itemClicked(id, label)"></item-row>')(newScope);
		//When
		newScope.$digest();
		mockBackend.flush();
		//Then
		var elementScope = htmlElement.isolateScope();
		expect(elementScope.item).toEqual(newScope.testItem);
		expect(elementScope.getChangeRate(elementScope.item)).toEqual(1);
		
		expect(clickedIdValue).toBeUndefined();
		expect(clickedLabelValue).toBeUndefined();
		elementScope.onSelect();
		expect(clickedIdValue).toEqual(22);
		expect(clickedLabelValue).toEqual('testLabel');
	});
});