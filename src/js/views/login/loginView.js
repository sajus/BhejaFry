define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
        BaseView = require('views/BaseView'),
        loginPageTemplate = require('template!templates/login/login');

    require('css!../../../css/modules/login/login.css');
    require('modelBinder');
    require('bsAlert');
    require('jqueryCookie');

    return BaseView.extend({

        el: 'body',

        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();
            this._isAuthenticated = $.cookie('isAuthenticated');
            if (this._isAuthenticated) {
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
            'click .unableToAccess': 'unableToAccess'
        },

        unableToAccess: function() {
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
                        $.cookie('firstName', response.firstname);
                        $.cookie('lastName', response.lastname);
                        $.cookie('accesstype', response.accesstype);
                        Events.trigger('redirectToAuthPage', view.options);
                    } else {
                        Events.trigger("alert:error", [{
                            message: "The credentials you provided are invalid."
                        }]);
                    }
                }
            });
        },

        render: function() {
            this.$el.html(loginPageTemplate);
            this.$el.find('input[name="email"]').focus();

            this._modelBinder.bind(this.model, this.el);

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            // if (this.options.authorizationFailed === true) {
            //     Events.trigger("alert:error", [{
            //         message: "You are not authorized to view this page."
            //     }]);
            // }

            return this;
        },

        postData: function() {
            this.isAuthorized();
        }
    });
});