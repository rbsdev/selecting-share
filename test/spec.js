describe('selectingShare', function() {
  afterEach(function() {
    var element = document.querySelector('.selecting-share');
    if (element) { element.remove(); }
  });

  describe('instance', function() {
    var verifyParameter = function(param) {
      param.element = document.querySelector('#container-test');
      var result = window.selectingShare(param);

      for (var key in param) {
        if (key === 'element') { return; }
        expect(result[key]).to.equal(param[key]);
      }
    };

    var verifyDefaultSocialParameter = function(param) {
      param.element = document.querySelector('#container-test');
      var result = window.selectingShare(param);

      for (var key in param) {
        if (key === 'element') { return; }
        expect(result[key]).to.be.true;
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

    it('should set value passed by parameter to googlePlus property', function() {
      verifyParameter({ 'hasGooglePlus': false });
    });

    it('should set value passed by parameter to facebook property', function() {
      verifyParameter({ 'hasFacebook': false });
    });

    it('should set value passed by parameter to twitter property', function() {
      verifyParameter({ 'hasTwitter': false });
    });

    it('should default value to googlePlus to be true', function() {
      verifyDefaultSocialParameter({ 'hasGooglePlus': undefined }, true);
    });

    it('should default value to facebook to be true', function() {
      verifyDefaultSocialParameter({ 'hasFacebook': undefined }, true);
    });

    it('should default value to twitter to be true', function() {
      verifyDefaultSocialParameter({ 'hasTwitter': undefined }, true);
    });
  });

  describe('creation', function() {
    it('should exists selecting-share html', function() {
      window.selectingShare({ element: document.querySelector('#container-test') });
      var element = document.querySelector('.selecting-share');

      expect(element).to.be.an('object');
      expect(element.querySelector('.twitter')).to.be.an('object');
      expect(element.querySelector('.facebook')).to.be.an('object');
      expect(element.querySelector('.google-plus')).to.be.an('object');
    });
  });

});
