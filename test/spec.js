describe('selectingShare', function() {

  describe('instance', function() {
    var verifyParameter = function(param) {
      var result = window.selectingShare(param);
      expect(result.elements.content).to.equal(param.element);
    };

    it('should exists selectingShare object', function() {
      expect(window.selectingShare).be.an('function');
    });

    it('should set element passed by parameter', function() {
      verifyParameter({ element: document.querySelector('#container-test') });
    });
  });

});
