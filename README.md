# selecting-share
A solution to share the selected texts by the user. Selecting-share use [selecting library](https://github.com/EvandroLG/selecting/).

## Instalation
To install selecting-share, execute:

```shell
  bower install selecting-share
```

## Supported Browsers
* Google Chrome
* Firefox
* Internet Explorer 9.0+
* Safari
* Opera

## How to use?
It's an agnostic library, ie you don't need to be using jQuery or Zepto in your project. You simply need to include it at the end of your HTML code:

```html
  <script src="selecting-share.js"></script>
```

selecting-share also has support for AMD and CommonJS.

Then you can call <code>window.selectingShare</code> function passing DOM element (or jQuery object) as parameter. For example:
```js
  window.selectingShare({
    element: document.querySelectorAll('.container')
  });
```

## Parameters:
* **element** <code>object</code>
* **url** <code>string</code> (by default the library shares the current URL)
* **hasFacebook** <code>boolean</code> (by default <code>true</code>)
* **hasTwitter** <code>boolean</code> (by default <code>true</code>)
* **hasGooglePlus** <code>boolean</code> (by default <code>true</code>)
* **callback** <code>function</code>

## Contributors
[![@evandrolg](https://avatars3.githubusercontent.com/u/444054?v=3&amp;s=96)](https://github.com/evandrolg)