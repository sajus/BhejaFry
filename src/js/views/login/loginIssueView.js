define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
        Baseview = require('views/baseview'),
        loginIssuePageTemplate = require('template!templates/login/loginIssue'),
        LoginIssueModel = require('models/login/loginIssueModel');

    require('css!../../../css/modules/login/login.css');
    require('modelBinder');
    require('bsAlert');
    require('bsTooltip');

    return Baseview.extend({

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

        checkAccountStatus: function() {
            this.model.save(this.model.toJSON(), {
                success: function() {
                    Events.trigger("alert:success", [{
                        message: "Your ticket request has been raised."
                    }]);
                },
                error: function(model, response) {
                    Events.trigger("alert:error", [{
                        message: response.responseText || "The email you entered is incorrect."
                    }]);
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
            this.$el.find(":input[type='radio']").filter('[value=recover]').prop('checked', true).tooltip({
                title: 'Select to raise a request to recover your password',
                animation: true
            });

            this.$el.find(":input[type='radio']").filter('[value=unlock]').tooltip({
                title: 'Select to raise a request to unlock your existing account',
                animation: true
            });
        },

        postData: function() {
            this.checkAccountStatus();
        }
    });
});