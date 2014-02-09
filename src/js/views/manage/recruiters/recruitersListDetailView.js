define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        Baseview = require('views/baseview'),
        recruitersListDetailTemplate = require('template!templates/manage/recruiters/recruitersListDetail');

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
            'submit .recruiterForm': 'processForm',
            'change :input, blur :input': 'processField',
            'click .cancelRecruiterForm': 'cancelForm'
        },

        cancelForm: function() {
            Events.trigger("view:navigate", {
                path: "mgnRecruiters",
                options: {
                    trigger: true
                }
            });
        },

        render: function() {
            var view = this;

            this.$el.html(recruitersListDetailTemplate({
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
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Edit Recruiter Details</li>");
            } else {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Add Recruiter Details</li>");
            }
        },

        postData: function() {
            var view = this;

            var message = (this.model.get('id') !== null) ? "Recruiter get updated successfully." : "Recruiter get saved successfully.";
            this.model.save(view.model.toJSON(), {
                success: function(model, response) {
                    Events.trigger("alert:success", [{
                        message: message
                    }]);
                    Events.trigger("view:navigate", {
                        path: "mgnRecruiters",
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