module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        clean: {
            build: ['prod']
        },
        shell: {
            uglify: {
                command: 'node tools/r.js -o tools/build.js'
            }
        },
        jshint: {
            all: ['src/js/**/*.js'],
            options: {
                ignores: ['src/js/main.js', 'src/js/vendors/**/*.js'],
                "strict": true,
                "curly": true,
                "eqeqeq": true,
                "immed": true,
                "latedef": true,
                "newcap": true,
                "noarg": true,
                "sub": true,
                "undef": false,
                "boss": true,
                "eqnull": true,
                "browser": true,
                "unused": true,
                "proto": true,
                "globals": {
                    "jQuery": true,
                    "define": true,
                    "require": true,
                    "console": true,
                    "$": true,
                    "_": true,
                    "asyncTest": true,
                    "deepEqual": true,
                    "equal": true,
                    "expect": true,
                    "module": true,
                    "notDeepEqual": true,
                    "notEqual": true,
                    "notStrictEqual": true,
                    "ok": true,
                    "QUnit": true,
                    "raises": true,
                    "start": true,
                    "stop": true,
                    "strictEqual": true,
                    "test": true,
                    "throws": true,
                    "prompt": true,
                    "alert": true
                }
            }
        },
        csslint: {
            strict: {
                src: [
                    "src/css/**/*.css"
                ],
                options: {
                    "ids": false,
                    "overqualified-elements": false,
                    "important": false,
                    "adjoining-classes": false,
                    "known-properties": false,
                    "box-sizing": false,
                    "box-model": false,
                    "display-property-grouping": false,
                    "bulletproof-font-face": false,
                    "compatible-vendor-prefixes": false,
                    "regex-selectors": false,
                    "errors": false,
                    "duplicate-background-images": false,
                    "duplicate-properties": false,
                    "empty-rules": false,
                    "selector-max-approaching": false,
                    "gradients": false,
                    "fallback-colors": false,
                    "font-sizes": false,
                    "font-faces": false,
                    "floats": false,
                    "star-property-hack": false,
                    "outline-none": false,
                    "import": false,
                    "underscore-property-hack": false,
                    "rules-count": false,
                    "qualified-headings": false,
                    "selector-max": false,
                    "shorthand": false,
                    "text-indent": false,
                    "unique-headings": false,
                    "universal-selector": false,
                    "unqualified-attributes": false,
                    "vendor-prefix": true,
                    "zero-units": false
                }
            }
        },
        strip: {
            main: {
                src: 'prod/src/js/**/*.js',
                options: {
                    inline: true,
                    nodes: ['console.log', 'debug']
                }
            }
        }
    });

    // Load NPM Task
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks("grunt-strip");

    // Load Default Task.
    grunt.registerTask("default", ["clean", "jshint", "csslint"]);

    // Load Build Task;
    grunt.registerTask("build", ["clean", "jshint", "csslint", "shell", "strip"]);
};