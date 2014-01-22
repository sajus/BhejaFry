define(function(require) {
    'use strict';

    var LoginView = require('views/login/loginView'),
        LoginModel = require('models/login/loginModel'),
        globals = require('globals'),
        views = {};

    var create = function(context, name, View, options) {
        var view = null;
        /*
            View clean up isn't actually implemented yet,
            but will simply call .clean, .remove and .unbind
        */
        if (typeof views[name] !== 'undefined') {
            views[name].undelegateEvents();
            if (typeof views[name].clean === 'function') {
                views[name].clean();
            }
        }
        var skipAuthCheck = false;
        if (options !== undefined) {
            if (options.skipAuthCheck) {
                skipAuthCheck = true;
            }
        }
        if (!globals.getAuthUser().isAuthenticated && !skipAuthCheck) {
            var loginModel = new LoginModel();
            view = new LoginView({
                model: loginModel,
                authorizationFailed: !skipAuthCheck,
                targetView: View,
                targetOptions: options
            });
        } else {
            view = new View(options);
        }

        views[name] = view;

        if (context !== undefined) {
            if (typeof context.children === 'undefined') {
                context.children = {};
                context.children[name] = view;
            } else {
                context.children[name] = view;
            }
        }

        return view;
    };

    return {
        create: create
    };
});