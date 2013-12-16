define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
        BaseView = require('views/BaseView'),
        usersListTemplate = require('template!templates/users/usersDetail'),
        UsersListDetailModel = require('models/users/usersListDetailModel');

    require('modelBinder');
    require('modelValidator');
    require('bsAlert');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.model = new UsersListDetailModel({'id': this.id});
            this.render();
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },

        render: function() {
            var view = this;
            var addUserText = (this.model.get('id')) ? "Update" : "Save";
            var title = this.model.get('id') ? "Edit existing user" : "Add new user";

            if (this.model.get('id') !== undefined) {
                this.model.fetch({
                    success: function() {
                        var data = view.model.toJSON();
                        view.$el.html(usersListTemplate({
                            empid: data.empid,
                            email: data.email,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            accesstype: data.accesstype,
                            addUserText: addUserText,
                            title: title
                        }));
                        view.modelBinder.bind(view.model, view.el);
                        view.$el.find('input:radio[name=accesstype]').filter('[value=' + data.accesstype + ']').prop('checked', true);
                    }
                });
            } else {
                view.modelBinder.bind(view.model, view.el);
            }

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        postData: function() {
            var view = this;
            view.model.save(view.model.toJSON(), {
                success: function() {
                    Events.trigger("alert:success", [{
                        message: "Record successfully."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "usersList",
                        options: {
                            trigger: true
                        }
                    });
                },
                error: function() {
                    Events.trigger("alert:error", [{
                        message: "Some service error occured during data Saving."
                    }]);
                }
            });
        }
    });
});