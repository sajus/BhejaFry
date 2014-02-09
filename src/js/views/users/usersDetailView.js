define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        Baseview = require('views/baseview'),
        usersListTemplate = require('template!templates/users/usersDetail');

    require('modelBinder');
    require('modelValidator');
    require('bsAlert');

    return Baseview.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.render();
        },

        events: {
            'submit .usersForm': 'processForm',
            'change :input, blur :input': 'processField',
            'click .cancelUsersForm': 'cancelForm'
        },

        cancelForm: function() {
            Events.trigger("view:navigate", {
                path: "usersList",
                options: {
                    trigger: true
                }
            });
        },

        render: function() {
            var view = this;

            this.$el.html(usersListTemplate({
                editMode: (view.model.get('email')) ? true : false
            }));

            if (this.model.get('email') !== null) {
                this.model.fetch({
                    success: function() {
                        view.modelBinder.bind(view.model, view.el);
                        var possibleData = view.model.toJSON();
                        view.$el.find('input:radio[name=role_id]').filter('[value=' + possibleData.role_id + ']').prop('checked', true);
                    }
                });
            } else {
                this.modelBinder.bind(this.model, this.el);
            }

            this.uxFormation();

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        uxFormation: function() {
            if (this.model.get('email')) {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Edit User Details</li>");
            } else {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Add User Details</li>");
            }
        },

        postData: function() {
            var view = this;

            var message = (this.model.get('email') !== null) ? "User get updated successfully." : "User get saved successfully.";
            this.model.save(view.model.toJSON(), {
                success: function(model, response) {
                    Events.trigger("alert:success", [{
                        message: message
                    }]);
                    Events.trigger("view:navigate", {
                        path: "usersList",
                        options: {
                            trigger: true
                        }
                    });
                },
                error: function(model, response) {
                    Events.trigger("alert:warning", [{
                        message: response.responseText
                    }]);
                }
            });
        }
    });
});