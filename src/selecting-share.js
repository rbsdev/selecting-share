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
      this.elements.boxShare = element;
    },

    start: function() {
      this.createElement();

      var onSelected = function(selected) {

      };

      global.selecting(this.elements.content, onSelected);
    }
  };

}(window, document));