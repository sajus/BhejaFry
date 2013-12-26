define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Baseview = require('views/baseview'),
        Events = require('events'),
        loginPageTemplate = require('template!templates/login/login'),
        LoginModel = require('models/login/loginModel');

    require('css!../../../css/modules/login/login.css');
    require('modelBinder');
    require('bsAlert');
    require('jqueryCookie');

    return Baseview.extend({

        el: 'body',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.model = new LoginModel();
            this.isAuthenticated = $.cookie('isAuthenticated');
            if (this.isAuthenticated) {
                Events.trigger("view:navigate", {
                    path: "dashboard",
                    options: {
                        trigger: true
                    }
                });
            }
            this.render();
        },

        events: {
            'submit .signInForm': 'processForm',
            'change :input, blur :input': 'processField',
            'click .switchToLoginIssue': 'switchToLoginIssue'
        },

        switchToLoginIssue: function() {
            Events.trigger("view:navigate", {
                path: "loginIssue",
                options: {
                    trigger: true
                }
            });
        },

        isAuthorized: function() {
            var view = this;

            this.model.save(this.model.toJSON(), {
                success: function(model, response) {
                    if (response.isAuthenticated) {
                        $.cookie('isAuthenticated', true);
                        $.cookie('email', response.email);
                        $.cookie('username', response.username);
                        $.cookie('roles', response.roles);
                        Events.trigger('redirectToAuthPage', view.options);
                    }
                },
                error: function(model, response) {
                    Events.trigger("alert:error", [{
                        message: response.responseText || "The email or password you entered is incorrect."
                    }]);
                }
            });
        },

        render: function() {
            this.$el.html(loginPageTemplate);
            this.uxFormation();

            this.modelBinder.bind(this.model, this.el);

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        uxFormation: function() {
            this.$el.find('input[name="email"]').focus();
        },

        postData: function() {
            this.isAuthorized();
        }
    });
});