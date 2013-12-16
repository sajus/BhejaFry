define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
        BaseView = require('views/BaseView'),
        loginIssuePageTemplate = require('template!templates/login/loginIssue'),
        LoginIssueModel = require('models/login/loginIssueModel');

    require('css!../../../css/modules/login/login.css');
    require('modelBinder');
    require('bsAlert');
    require('bsTooltip');
    require('jqueryCookie');

    return BaseView.extend({

        el: 'body',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.model = new LoginIssueModel();
            this.render();
        },

        events: {
            'submit .signInIssueForm': 'processForm',
            'change :input, blur :input': 'processField',
            'click .switchToLogin': 'switchToLogin'
        },

        switchToLogin: function() {
            Events.trigger("view:navigate", {
                path: "login",
                options: {
                    trigger: true
                }
            });
        },

        isAuthentication: function() {
            this.model.save(this.model.toJSON(), {
                success: function(model, response) {
                    if (!response.isAuthenticated) {
                        Events.trigger("alert:error", [{
                            message: "The email you specified does not exist. To request an account, please contact your Cybage UI - IMS administrators."
                        }]);
                    }
                }
            });
        },

        render: function() {
            this.$el.html(loginIssuePageTemplate);
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
            this.$el.find(":input[type='radio']").filter('[value=reset]').prop('checked', true).tooltip({
                title: 'Select to raise a request to reset your password',
                animation: true
            });

            this.$el.find(":input[type='radio']").filter('[value=unlock]').tooltip({
                title: 'Select to raise a request to unlock your existing account',
                animation: true
            });
        },

        postData: function() {
            this.isAuthentication();
        }
    });
});