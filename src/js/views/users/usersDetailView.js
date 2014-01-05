define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
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

            if (this.model.get('email') !== undefined) {
                this.model.fetch({
                    success: function() {
                        var data = view.model.toJSON();
                        view.$el.html(usersListTemplate({
                            empid: data.empid,
                            email: data.email,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            editMode: (view.model.get('email')) ? true : false
                        }));
                        view.modelBinder.bind(view.model, view.el);
                        view.$el.find('input:radio[name=role_id]').filter('[value=' + data.role_id + ']').prop('checked', true);
                    }
                });
            } else {
                view.modelBinder.bind(view.model, view.el);
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
            this.model.set('empid', Number(this.model.get('empid')));
            this.model.set('role_id', Number(this.model.get('role_id')));

            var message = (this.model.get('email') !== null) ? "User get updated successfully." : "User get saved successfully.";
            this.model.save(view.model.toJSON(), {
                success: function() {
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