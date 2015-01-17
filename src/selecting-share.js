(function(global, doc,factory) {

  if (typeof exports === 'object' && exports) {
    factory(exports); // CommonJS
  } else if (typeof define === 'function' && define.amd) {
    define(['exports'], factory); // AMD
  } else {
    factory(global, doc); // <script>
  }

}(window, document, function(global, doc) {

  'use strict';

    var isChild = function(element, parent) {
    var node = element.parentNode;

    while (node !== null) {
      if (node === parent) { return true; }
      node = node.parentNode;
    }

    return false;
  };

  var isUndefined = function(value) {
    return value === undefined;
  };

  var isLib = function(element) {
    return global.jQuery && element instanceof global.jQuery ||
           global.Zepto && element instanceof global.Zepto;

  };

  var isNodeList = function(element) {
    var stringRepr = Object.prototype.toString.call(element);

    return typeof element === 'object' &&
          /^\[object (HTMLCollection|NodeList|Object)\]$/.test(stringRepr) &&
          element.hasOwnProperty('length') &&
          (element.length === 0 || (typeof element[0] === 'object' &&
          element[0].nodeType > 0));
  };

  var SelectingShare = function(params) {
    this.elements = {};
    this.elements.content = params.element;
    this.url = params.url || document.URL;
    this.callback = params.callback || function() {};
    this.hasGooglePlus = isUndefined(params.hasGooglePlus) ? true : params.hasGooglePlus;
    this.hasFacebook = isUndefined(params.hasFacebook) ? true : params.hasFacebook;
    this.hasTwitter = isUndefined(params.hasTwitter) ? true: params.hasTwitter;
  };

  SelectingShare.prototype = {
    createTemplate: function() {
      var facebook = '<li><a href="http://www.facebook.com/sharer/sharer.php?u={{ URL }}" \
                      class="facebook">Facebook</a></li>';
      var twitter = '<li><a href="#" class="twitter">Twitter</a></li>';
      var googlePlus = '<li><a href="http://plus.google.com/share?url={{ URL }}" \
                       class="google-plus">Google Plus</a></li>';

      var content = '';
      if (this.hasFacebook) { content += facebook; }
      if (this.hasTwitter) { content += twitter;  }
      if (this.hasGooglePlus) { content += googlePlus; }

      var template = '<ul>{{ CONTENT }}</ul>'
                      .replace('{{ CONTENT }}', content).replace(/\{\{ URL \}\}/g, this.url);

      return template;
    },

    createElement: function() {
      var hasElement = document.querySelector('selecting-share') !== null;

      if (hasElement) {
        return;
      }

      var element = doc.createElement('div');
      element.className = 'selecting-share';
      element.style.position = 'absolute';
      this.cleanElement(element);

      element.innerHTML = this.createTemplate();
      doc.body.appendChild(element);
      this.elements.boxShare = element;
      this.elements.twitter = this.elements.boxShare.querySelector('.twitter');
      this.elements.facebook = this.elements.boxShare.querySelector('.facebook');

      this.callback();
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
        boxShare.style.top = event.pageY + 'px';
        boxShare.style.left = event.pageX + 'px';
      };

      global.selecting(this.elements.content, onSelected.bind(this));
      this.event();

      return this;
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
    var element = param.element;

    if (isLib(element)) {
      param.element.each(function() {
        var keys = param;
        keys.element = this;

        new SelectingShare(keys).start();
      });

      return;
    }

    if (isNodeList(element)) {
      [].forEach.call(element, function(item) {
        var keys = param;
        keys.element = item;

        new SelectingShare(keys).start();
      });

      return;
    }

    return new SelectingShare(param).start();
  };

}));
