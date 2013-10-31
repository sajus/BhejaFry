/***
 * The goal of this file is mainly to intialize require.js AMD module loader configuration.
 * Your application code should not be here but in apps.js
 */
requirejs.config({
    /***
     * The path where your JavaScripts files are located.
     */
    baseUrl: './js/',

    /***
     * Map you module css files and load them only when its required or part of backbone's view.
     */
    map: {
        '*': {
            'css': 'vendors/require/plugins/require-css/css'
        }
    },

    /***
     * Path config is also part of Require and allows to define paths for vendors
     * not found directly under baseUrl.
     * See http://requirejs.org/docs/api.html#config-paths for details.
     */
    paths: {
        /*** List of frameworks/libraries to be included in this architecture. ***/
        'jquery': 'vendors/jquery/jquery',
        'underscore': 'vendors/underscore/underscore',
        'backbone': 'vendors/backbone/backbone',
        'handlebars': 'vendors/handlebars/handlebars',
        'bsAlert': 'vendors/bootstrap/js/alert',
        'bsTooltip': 'vendors/bootstrap/js/tooltip',
        'bsDropdown': 'vendors/bootstrap/js/dropdown',
        'bsCollapse': 'vendors/bootstrap/js/collapse',
        'bsModal': 'vendors/bootstrap/js/modal',
        'moment': 'vendors/moment/moment',

        /*** List of custom utility files. ***/
        'template': 'utilities/handlebars-template-mapper',
        'handlebars_Helpers': 'utilities/handlebars-helpers',

        /*** Templates ***/
        'templates': '../templates',

        /*** List of Backbone plugins ***/
        'modelValidator': 'vendors/backbone/plugins/backbone-validation',
        'modelBinder': 'vendors/backbone/plugins/backbone-modelbinder',

        /*** List of Require plugins ***/
        'text': 'vendors/require/plugins/text',

        /*** List of Bootstrap plugins ***/
        'fuelux': 'vendors/bootstrap/plugins/fuelux/all.min',
        'fueluxDataGrid': 'vendors/bootstrap/plugins/fuelux/datagrid',
        'fueluxDataSource': 'vendors/bootstrap/plugins/fuelux/datasource',
        'fueluxSelectBox': 'vendors/bootstrap/plugins/fuelux/select',
        'fueluxSearchBox': 'vendors/bootstrap/plugins/fuelux/search',
        'util': 'vendors/bootstrap/plugins/fuelux/util',
        'fueluxWizard': 'vendors/bootstrap/plugins/fuelux/wizard',
        'datePicker': 'vendors/bootstrap/plugins/datepicker/datepicker',

        /*** List of jQuery plugins ***/
        'jqueryCookie': 'vendors/jquery/plugins/jquery.cookie',
        'chosen': 'vendors/jquery/plugins/chosen/chosen.jquery.min'
    },

    /***
     * shim config is part of `Require 2.0`_ and allows to Configure the dependencies
     * and exports for older, traditional “browser globals” scripts that do not use
     * define() to declare the dependencies and set a module value.
     * See http://requirejs.org/docs/api.html#config-shim for more details.
     */
    shim: {
        backbone: {
            deps: ['jquery', 'underscore'],
            exports: 'Backbone'
        },
        underscore: {
            exports: '_'
        },
        handlebars: {
            exports: 'Handlebars'
        },
        bsAlert: {
            deps: ['jquery']
        },
        bsTooltip: {
            deps: ['jquery']
        },
        bsDropdown: {
            deps: ['jquery']
        },
        bsCollapse: {
            deps: ['jquery']
        },
        bsModal: {
            deps: ['jquery']
        },
        modelBinder: {
            deps: ['backbone'],
            exports: 'Backbone.ModelBinder'
        },
        datePicker: {
            deps: ['jquery']
        },
        chosen: {
            deps: ['jquery']
        }
    }
});

/*** Load app.js to initialize your application module. ***/
require(['views/app', 'router', 'core'], function(AppView, Router, Core) {
    var appView = Core.create({}, 'AppView', AppView, {
        skipAuthCheck: true
    });
    appView.render();

    /***
     * The router now has a copy of all main appview
     */
    Router.initialize({
        appView: appView
    });
});