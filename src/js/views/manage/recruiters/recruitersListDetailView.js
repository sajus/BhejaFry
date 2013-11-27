define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
        BaseView = require('views/BaseView'),
        recruitersListDetailTemplate = require('template!templates/manage/recruiters/recruitersListDetail');

    require('modelBinder');
    require('modelValidator');
    require('bsAlert');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.render();
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },

        render: function() {
            var view = this;
            var addUserText = (this.model.get('id')) ? "Update" : "Save";
            var title = this.model.get('id') ? "Edit existing recruiter" : "Add new recruiter";

            if (this.model.get('id') !== undefined) {
                this.model.fetch({
                    success: function() {
                        var data = view.model.toJSON();
                        view.$el.html(recruitersListDetailTemplate({
                            empid: data.empid,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            addUserText: addUserText,
                            title: title
                        }));
                        view.modelBinder.bind(view.model, view.el);
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
                        path: "mgnRecruiters",
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