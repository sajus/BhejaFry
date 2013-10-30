define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    var Events = require('events');
    var BaseView = require('views/BaseView');
    var loginIssuePageTemplate = require('template!templates/login/loginIssue');
    var LoginIssueModel = require('models/login/loginIssueModel');

    require('css!../../../css/modules/login/login.css');
    require('modelBinder');
    require('bootstrapAlert');
    require('bootstrapTooltip');
    require('jqueryCookie');

    return BaseView.extend({

        el: 'body',

        initialize: function() {
            this.model = new LoginIssueModel();
            this._modelBinder = new Backbone.ModelBinder();
            this.render();
        },

        events: {
            'submit .signInIssueForm': 'processForm'
        },

        isAuthentication: function() {
            this.model.save(this.model.toJSON(), {
                success: function(model, response) {
                    if(!response.isAuthenticated) {
                        Events.trigger("alert:error", [{
                            message: "The email you specified does not exist.<br>To request an account, please contact your Cybage UI - IMS administrators."
                        }]);
                    }
                }
            });
        },

        render: function() {
            this.$el.html(loginIssuePageTemplate);
            this.$el.find('input[name="email"]').focus();

            this._modelBinder.bind(this.model, this.el);

            this.$el.find(":input[type='radio']").filter('[value=reset]').prop('checked', true).tooltip({
                title: 'Select this option to raise a request to reset your password',
                animation: true
            });

            this.$el.find(":input[type='radio']").filter('[value=unlock]').tooltip({
                title: 'Select this option to raise a request to unlock your existing account',
                animation: true
            });

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            // if(this.options.authorizationFailed===true){
            //     Events.trigger("alert:error", [{
            //         message: "You are not authorized to view this page."
            //     }]);
            // }

            return this;
        },

        postData: function() {
            this.isAuthentication();
        }
    });
});