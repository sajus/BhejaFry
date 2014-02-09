define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        Baseview = require('views/baseview'),
        interviewersListDetailTemplate = require('template!templates/manage/interviewers/interviewersListDetail');

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
            'submit .interviewerForm': 'processForm',
            'change :input, blur :input': 'processField',
            'click .cancelInterviewerForm': 'cancelForm'
        },

        cancelForm: function() {
            Events.trigger("view:navigate", {
                path: "mgnInterviewers",
                options: {
                    trigger: true
                }
            });
        },

        render: function() {
            var view = this;

            this.$el.html(interviewersListDetailTemplate({
                editMode: (view.model.get('id')) ? true : false
            }));

            if (this.model.get('id') !== null) {
                this.model.fetch({
                    success: function() {
                        view.modelBinder.bind(view.model, view.el);
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
            if (this.model.get('id')) {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Edit Interviewer Details</li>");
            } else {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Add Interviewer Details</li>");
            }
        },

        postData: function() {
            var view = this;

            var message = (this.model.get('id') !== null) ? "Interviewer get updated successfully." : "Interviewer get saved successfully.";
            this.model.save(view.model.toJSON(), {
                success: function(model, response) {
                    Events.trigger("alert:success", [{
                        message: message
                    }]);
                    Events.trigger("view:navigate", {
                        path: "mgnInterviewers",
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