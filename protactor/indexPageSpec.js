describe('index page routing', function() {
	it('should show controller\'s first variable with name "variable"', function() {
		browser.get("/");
		var inputTextElement = element(by.model('ctrl.variable'));
		expect(inputTextElement.getAttribute('value')).toBe('12');
	});
});