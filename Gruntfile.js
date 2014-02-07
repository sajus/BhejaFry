module.exports = function(grunt) {
    "use strict";

    grunt.initConfig({
        clean: {
            build: ["prod"]
        },
        shell: {
            uglify: {
                command: "node tools/r.js -o tools/build.js"
            }
        },
        jshint: {
            all: ["src/js/**/*.js"],
            options: {
                ignores: ["src/js/main.js", "src/js/vendors/**/*.js"],
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
        jscs: {
            src: "src/js/**/*.js",
            options: {
                "requireCurlyBraces": ["if", "else", "for", "while", "do", "try", "catch"],
                "requireSpaceAfterKeywords": ["if", "else", "for", "while", "do", "switch", "return", "try", "catch"],
                "disallowLeftStickedOperators": ["?", "+", "-", "/", "*", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
                "disallowRightStickedOperators": ["?", "+", "/", "*", ":", "=", "==", "===", "!=", "!==", ">", ">=", "<", "<="],
                "requireRightStickedOperators": ["!"],
                "requireLeftStickedOperators": [","],
                "disallowImplicitTypeConversion": ["string"],
                "disallowKeywords": ["with"],
                "disallowMultipleLineBreaks": true,
                "disallowKeywordsOnNewLine": ["else"],
                //"requireLineFeedAtFileEnd": true, // requireLineFeedAtFileEnd option requires true value or should be removed
                "excludeFiles": ["src/js/vendors/**/*.js", "src/js/main.js"],
                "validateJSDoc": {
                    "checkParamNames": true,
                    "requireParamTypes": true
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
        htmlhint: {
            Other_Then_Templates: {
                options: {
                    "tag-pair": true,
                    "tagname-lowercase": true,
                    "attr-lowercase": true,
                    "attr-value-double-quotes": true,
                    "attr-value-not-empty": true,
                    "doctype-first": true,
                    "tag-self-close": true,
                    "spec-char-escape": true,
                    "id-unique": true,
                    "head-script-disabled": true,
                    "img-alt-require": true,
                    "doctype-html5": true,
                    "id-class-value": true
                },
                src: [
                    "src/*.html"
                ]
            },
            Templates: {
                options: {
                    "tagname-lowercase": true,
                    "attr-lowercase": true,
                    "attr-value-double-quotes": true,
                    "attr-value-not-empty": true,
                    "tag-self-close": false,
                    "spec-char-escape": true,
                    "id-unique": true,
                    "head-script-disabled": true,
                    "img-alt-require": true,
                    "id-class-value": true,
                    "style-disabled": true
                },
                src: [
                    "src/templates/**/*.html"
                ]
            }
        },
        strip: {
            main: {
                src: "prod/src/js/**/*.js",
                options: {
                    inline: true,
                    nodes: ["console.log", "debug"]
                }
            }
        },
        chmod: {
            options: {
                mode: "644"
            },
            source: {
                src: ["src/**/*.js"]
            }
        },
        imagemin: {
            dynamic: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'src/',
                    src: ['src/imgs/**/*.{png,jpg,gif}'],
                    dest: 'prod/imgs/'
                }]
            }
        }
    });

    /**
     * Load NPM Task
     */
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-jscs-checker");
    grunt.loadNpmTasks("grunt-contrib-csslint");
    grunt.loadNpmTasks('grunt-htmlhint');
    grunt.loadNpmTasks("grunt-shell");
    grunt.loadNpmTasks("grunt-strip");
    grunt.loadNpmTasks("grunt-chmod");
    grunt.loadNpmTasks("grunt-contrib-imagemin");

    /**
     * Load Default Task
     */
    grunt.registerTask("default", ["chmod", "jshint", "jscs", "csslint", "htmlhint"]);

    /**
     * Load Build Task
     */
    grunt.registerTask("build", ["chmod", "jshint", "jscs", "csslint", "htmlhint", "clean", "shell", "imagemin", "strip"]);
};