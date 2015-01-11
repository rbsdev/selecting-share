(function(global, doc) {

  'use strict';

  var isChild = function(element, parent) {
    var node = element.parentNode;

    while (node !== null) {
      if (node === parent) { return true; }
      node = node.parentNode;
    }

    return false;
  };

  var SelectingShare = function(params) {
    this.elements = {};
    this.elements.content = params.element;
    this.url = params.url || document.URL;
    this.callback = params.callback || function() {};
    this.social = {};
    this.hasGooglePlus = params.googlePlus;
    this.hasFacebook = params.facebook;
    this.hassTwitter = params.twitter;
  };

  SelectingShare.prototype = {
    createTemplate: function() {
      var facebook = '<li><a href="http://www.facebook.com/sharer/sharer.php?u={{ URL }}" class="facebook">Facebook</a></li>';
      var twitter = '<li><a href="{{ TWITTER_URL }}" class="twitter">Twitter</a></li>';
      var googlePlus = '<li><a href="https://plus.google.com/share?url={{ URL  }} class="twitter">Google Plus</a></li>';

      var content = '';
      if (this.hasFacebook) { content += facebook; }
      if (this.hasTwitter) { content += twitter;  }
      if (this.hasGooglePlus) { content += googlePlus; }

      var template = [
        '<ul>',
          '{{ CONTENT }}',
        '</ul>'
      ].join('').replace('{{ CONTENT  }}', content).replace(/\{\{ URL \}\}/g, this.url);

     return template;
    },

    createElement: function() {
      var element = doc.createElement('div');
      element.className = 'selecting-share';
      element.style.position = 'absolute';
      this.cleanElement(element);

      element.innerHTML = this.createTemplate();
      doc.body.appendChild(element);
      this.elements.boxShare = element;
      this.elements.twitter = this.elements.boxShare.querySelector('.twitter');
      this.elements.facebook = this.elements.boxShare.querySelector('.facebook');
    },

    start: function() {
      this.createElement();

      var boxShare = this.elements.boxShare;

      var onSelected = function(result) {
        var text = result.text;
        var event = result.event;

        if (!text) {
          this.cleanElement(boxShare);
          return;
        }

        this.updateText(text);
        boxShare.style.top = event.y + 'px';
        boxShare.style.left = event.x + 'px';
      };

      global.selecting(this.elements.content, onSelected.bind(this));
      this.event();
    },

    updateText: function(text) {
      this.updateTwitterText(text);
    },

    updateTwitterText: function(text) {
      var twitterURL = 'http://twitter.com/intent/tweet?text={{ TEXT }} - ' + this.url;
      this.elements.twitter.href = twitterURL.replace('{{ TEXT }}', text);
    },

    event: function() {
      var boxShare = this.elements.boxShare;
      var content = this.elements.content;

      doc.addEventListener('mouseup', function(e) {
        if (e.target === content) { return; }
        if (isChild(e.target, content)) { return; }

        this.cleanElement(boxShare);
      }.bind(this));
    },

    cleanElement : function(boxShare) {
      boxShare.style.top = '0px';
      boxShare.style.left = '-9999px';
    }
  };

  global.selectingShare = function(param) {
    new SelectingShare(param).start();
  };

}(window, document));
