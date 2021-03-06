define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Events = require('events'),
    BaseView = require('views/BaseView'),
    interviewersListDetailTemplate = require('template!templates/manage/interviewers/interviewersListDetail');

    require('modelBinder');
    require('modelValidator');
    require('bootstrapAlert');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input': 'processField'
        },

        render: function () {
            var self = this;
            var addUserText = (this.model.get('id'))?"Update":"Save";
            var title = this.model.get('id')?"Edit existing interviewer":"Add new interviewer"

            if(this.model.get('id')!==undefined) {
                this.model.fetch({
                    success:function(){
                        var data = self.model.toJSON();
                        self.$el.html(interviewersListDetailTemplate({
                            empid: data.empid,
                            firstname: data.firstname,
                            lastname: data.lastname,
                            addUserText: addUserText,
                            title: title
                        }));
                        self.modelBinder.bind(self.model, self.el);
                    }
                });
            } else {
                self.modelBinder.bind(self.model, self.el);
            }

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        postData: function() {
            var self = this;
            self.model.save(self.model.toJSON(), {
                success: function(model,response) {
                    Events.trigger("alert:success", [{
                        message: "Record successfully."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "mgnInterviewers",
                        options: {
                            trigger: true
                        }
                    });
                },
                error: function(model,response) {
                    console.log(response)
                    Events.trigger("alert:error", [{
                        message: "Some service error occured during data Saving."
                    }]);
                }
            });
        }
    });
});
