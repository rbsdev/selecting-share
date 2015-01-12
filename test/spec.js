describe('selectingShare', function() {

  describe('instance', function() {
    var verifyParameter = function(param) {
      param.element = document.querySelector('#container-test');
      var result = window.selectingShare(param);

      for (var key in param) {
        if (key === 'element') { return; }
        expect(result[key]).to.equal(param[key]);
      }
    };

    it('should exists selectingShare object', function() {
      expect(window.selectingShare).be.an('function');
    });

    it('should set element passed by parameter', function() {
      var param = { 'element': document.querySelector('#container-test') };
      var result = window.selectingShare(param);
      expect(result.elements.content).to.equal(param.element);
    });

    it('should set url passed by parameter', function() {
      verifyParameter({ 'url': 'http://zh.clicrbs.com.br' });
    });

    it('should set function passed by parameter', function() {
      verifyParameter({ 'callback': function() {} });
    });

    it('should set true value to googlePlus property', function() {
      verifyParameter({ 'hasGooglePlus': true });
    });

    it('should set true value to facebook property', function() {
      verifyParameter({ 'hasFacebook': true });
    });

    it('should set true value to twitter property', function() {
      verifyParameter({ 'hasFacebook': true });
    });
  });

});
