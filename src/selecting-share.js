(function(global, doc) {

  'use strict';

  var isChild = function(element, elementParent) {
    return element.parentNode === elementParent;
  };

  var SelectingShare = function(params) {
    this.elements = {};
    this.elements.content = params.element;
    this.template = [
        '<ul>',
          '<li>',
            '<a href="" class="facebook">Facebook</a>',
          '</li>',
          '<li>',
            '<a href="http://twitter.com/intent/tweet?text={{ TEXT }}" class="twitter">Twitter</a>',
          '</li>',
        '</ul>'
      ].join('');
  };

  SelectingShare.prototype = {
    createElement: function() {
      var element = doc.createElement('div');
      element.className = 'selecting-share';
      element.style.position = 'absolute';
      this.cleanElement(element);

      element.innerHTML = this.template;
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
      this.elements.twitter.href = this.elements.twitter.getAttribute('href').replace('{{ TEXT }}', text);
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