/*
    The goal of this file is mainly to intialize require.js AMD module loader configuration.
    Your application code should not be here but in apps.js
*/
requirejs.config({
    /*
        The path where your JavaScripts are located.
    */
    baseUrl: './js/',

    map: {
        '*': {
            'css': 'vendors/require/plugins/require-css/css'
        }
    },

    /*
      Path config is also part of Require and allows to define paths for vendors
      not found directly under baseUrl.
      See http://requirejs.org/docs/api.html#config-paths for details.
    */
    paths: {

        /* List of frameworks/libraries to be included in this architecture. */
        'jquery': 'vendors/jquery/jquery',
        'underscore': 'vendors/underscore/underscore',
        'backbone': 'vendors/backbone/backbone',
        'handlebars': 'vendors/handlebars/handlebars',
        'moment': 'vendors/moment/moment',
        'bootstrap': 'vendors/bootstrap/js/bootstrap.min',

        /* List of custom files to be loaded in this architecture. */
        'template': 'utilities/handlebars-template-mapper',
        'formHelpers': 'utilities/formHelpers',
        'handlebars_Helpers': 'utilities/handlebars-helpers',
        'templates': '../templates',

        /* List of Backbone plugins */
            'modelValidator':'vendors/backbone/plugins/backbone-validation',
            'modelBinder':'vendors/backbone/plugins/backbone-modelbinder',
        /* List of Require plugins */
            'text': 'vendors/require/plugins/text',

        /* List of Bootstrap plugins */
            'bootstrapAlert': 'vendors/bootstrap/js/bootstrap-alert',
            'bootstrapDropdown': 'vendors/bootstrap/js/bootstrap-dropdown',
            'bootstrapTransition': 'vendors/bootstrap/js/bootstrap-transition',            

        /* List of jQuery plugins */
            'jqueryCookie': 'vendors/jquery/plugins/jquery.cookie',

    },

    /*
        shim config is part of `Require 2.0`_ and allows to Configure the dependencies
        and exports for older, traditional “browser globals” scripts that do not use
        define() to declare the dependencies and set a module value.
        See http://requirejs.org/docs/api.html#config-shim for more details.
    */
    shim: {
        backbone: {
            deps: ['jquery','underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        bootstrap: {
            deps: ['jquery']
        },
        bootstrapAlert: {
            deps: ['jquery']
        },
        modelBinder:{
            deps:['backbone'],
            exports:'Backbone.ModelBinder'
        }
    }
});

/* Load app.js to initialize your application module. */
require(['views/app', 'router', 'core'], function(AppView, Router, Core) {
    var appView = Core.create({}, 'AppView', AppView,{skipAuthCheck:true});
    appView.render();

    /*
        The router now has a copy of all main appview
    */
    Router.initialize({appView: appView});
});
