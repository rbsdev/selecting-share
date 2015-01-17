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

  var createInstance = function(url) {
    window.selectingShare({ 
      'element': document.querySelector('#container-test'), 
      'url': url
    });

    return document.querySelector('.selecting-share');
  };

  describe('creation', function() {
    it('should exists selecting-share html', function() {
      var element = createInstance();

      expect(element).to.be.an('object');
      expect(element.querySelector('.twitter')).to.be.an('object');
      expect(element.querySelector('.facebook')).to.be.an('object');
      expect(element.querySelector('.google-plus')).to.be.an('object');
    });

    it('should call selecting component', function() {
      var selectingCache = window.selecting;
      window.selecting = function() {
        expect(true).to.be.true();
      };

      createInstance();
      window.selecting = selectingCache;
    });
  });

  describe('social urls', function() {
    var verifyURL = function(social) {
      var url = 'http://www.zerohora.com.br';
      var element = createInstance(url);
      console.log(element);
      var href = element.querySelector('.' + social).href;

      var url = {
        'facebook': 'http://www.facebook.com/sharer/sharer.php?u=' + url,
        'twitter': document.URL + '#',
        'google-plus': 'http://plus.google.com/share?url=' + url
      };

      var expectedUrl = url[social];
      expect(href).to.equal(expectedUrl);
    };

    it('should has correct url to facebook', function() {
      verifyURL('facebook');
    });

    it('should has correct url to googlePlus', function() {
      verifyURL('google-plus');
    });

    it('should has correct url to twitter', function() {
      verifyURL('twitter');
    });
  });

});
