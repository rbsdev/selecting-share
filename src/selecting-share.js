(function(global, doc) {

  'use strict';

  var SelectingShare = function(params) {
    this.elements = {};
    this.elements.content = params.element;
  };

  SelectingShare.prototype = {
    createElement: function() {
      var element = document.createElement('div');
      element.className = 'selecting-share';
      element.style.position = 'absolute';

      var html = [
        '<ul>',
          '<li>',
            '<a href="" class="facebook">Facebook</a>',
          '</li>',
          '<li>',
            '<a href="" class="twitter">Twitter</a>',
          '</li>',
        '</ul>'
      ].join('');

      element.innerHTML = html;
      document.body.appendChild(element);
      this.elements.boxShare = element;
    },

    start: function() {
      this.createElement();

      var boxShare = this.elements.boxShare;

      var onSelected = function(result) {
        var text = result.text;
        var event = result.event;

        boxShare.style.top = event.pageY + 'px';
        boxShare.style.left = event.pageX + 'px';
      };

      global.selecting(this.elements.content, onSelected);
    }
  };

}(window, document));