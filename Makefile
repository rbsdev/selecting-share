JSHINT=./node_modules/jshint/bin/jshint
UGLIFY=./node_modules/uglify-js/bin/uglifyjs
MOCHA_PHANTOM=./node_modules/mocha-phantomjs/bin/mocha-phantomjs
VIGILIA=./node_modules/vigilia/bin/vigilia

.SILENT:

install_dependencies:
	npm install
	bower install

jshint:
	$(JSHINT) src/selecting-share.js
	echo "jshint was executed!"

test_js:
	$(MOCHA_PHANTOM) test/SpecRunner.html

minify:
	$(UGLIFY) bower_components/selecting/src/selecting.js src/selecting-share.js -o dist/selecting-share.min.js
	echo "minified!"

scripts: jshint minify

watch:
	$(VIGILIA) '$(DIR_SCRIPTS)src/selecting-share.js':'make scripts'

deploy: jshint test_js minify
