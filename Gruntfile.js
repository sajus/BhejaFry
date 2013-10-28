module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        jshint: {
            all: ['src/js/**/*.js'],
            options: {
                ignores: ['src/js/core.js', 'src/js/main.js', 'src/js/vendors/**/*.js', 'src/js/utilities/**/*.js'],
                undef: true,
                browser: true,
                node: true,
                jquery: true,
                strict: true,
                globals: {
                    define: true,
                    requirejs: true,
                    google: true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.registerTask('default', ['jshint']);
};