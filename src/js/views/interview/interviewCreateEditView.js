define(function(require) {

    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Core = require('core');
    var Events = require('events');
    var BaseView = require('views/BaseView');
    var interviewCreateEditPageTemplate = require('template!templates/interview/interviewCreateEdit');

    require('modelBinder');
    require('bootstrapAlert');
    require('jqueryCookie');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();

            this.interviewmode_list = {};
            this.interviewmode = [];

            this.interviewer_list = {};
            this.interviewer = [];

            this.interviewrounds_list = {};
            this.interviewrounds = [];

            this.interviewstatus_list = {};
            this.interviewstatus = [];

            this.recruiter_list = {};
            this.recruiter = [];
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input, blue :input': 'processField',
            'click #addCancel': 'addCancel'
        },

        render: function() {
            console.log(Core.globals);
            var self = this;
            _.each(Core.globals.interviewmode_list, function(data) {
                self.interviewmode_list = _.object([
                        "id",
                        "mode"
                    ], [
                        data.id,
                        data.mode
                    ]);
                self.interviewmode.push(self.interviewmode_list);
            });
            _.each(Core.globals.interviewer_list, function(data) {
                self.interviewer_list = _.object([
                        "empid",
                        "firstname",
                        "lastname"
                    ], [
                        data.empid,
                        data.firstname,
                        data.lastname
                    ]);
                self.interviewer.push(self.interviewer_list);
            });
            _.each(Core.globals.interviewrounds_list, function(data) {
                self.interviewrounds_list = _.object([
                        "id",
                        "round"
                    ], [
                        data.id,
                        data.round
                    ]);
                self.interviewrounds.push(self.interviewrounds_list);
            });
            _.each(Core.globals.recruiter_list, function(data) {
                self.recruiter_list = _.object([
                        "empid",
                        "firstname",
                        "lastname"
                    ], [
                        data.empid,
                        data.firstname,
                        data.lastname
                    ]);
                self.recruiter.push(self.recruiter_list);
            });
            _.each(Core.globals.interviewstatus_list, function(data) {
                self.interviewstatus_list = _.object([
                        "id",
                        "status"
                    ], [
                        data.id,
                        data.status
                    ]);
                self.interviewstatus.push(self.interviewstatus_list);
            });

            this.$el.html(interviewCreateEditPageTemplate({
                mode: this.interviewmode,
                interviewer1: this.interviewer,
                interviewer2: this.interviewer,
                recruiter: this.recruiter,
                rounds: this.interviewrounds,
                interviewStatus: this.interviewstatus
            }));

            this._modelBinder.bind(this.model, this.el);

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        postData: function() {
            var self = this;
            this.model.save(self.model.toJSON(), {
                success: function() {
                    Events.trigger("alert:success", [{
                        message: "User created successfully."
                    }]);
                },
                error: function() {
                    Events.trigger("alert:error", [{
                        message: "Some service error occured during data Saving."
                    }]);
                }
            });
        },

        addCancel: function() {
            Events.trigger("view:navigate", {
                path: "dashboard",
                options: {
                    trigger: true
                }
            });
        }
    });
});