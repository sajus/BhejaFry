define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Core = require('core'),
    Events = require('events'),
    BaseView = require('views/BaseView'),
    interviewListDetailPageTemplate = require('template!templates/interview/interviewListDetail');

    require('modelBinder');
    require('modelValidator');
    require('bootstrapAlert');
    require('datePicker');
    require('moment');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();

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
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input select, blur :input select': 'processField',
            'keypress #interviewDate': 'preventAction',
            'mousedown .pickerShow': 'showPicker'
        },

        preventAction:function(e){
            e.preventDefault();
        },

        showPicker: function(e) {
            this.$el.find('.date').datepicker({
                "autoclose": true
            }).data('datepicker');
        },

        render: function() {
            var self = this;
            var addUserText = (this.model.get('id'))?"Update":"Save";
            var title = this.model.get('id')?"Edit existing interview":"Add new interview"

            this.$el.find('.date').datepicker({
                "autoclose": true
            }).data('datepicker');

            this.$el.html(interviewListDetailPageTemplate({
                mode: this.interviewmode,
                interviewer1: this.interviewer,
                interviewer2: this.interviewer,
                interviewDate: this.interviewDate,
                recruiter: this.recruiter,
                rounds: this.interviewrounds,
                interviewStatus: this.interviewstatus,
                addUserText: addUserText,
                title: title
            }));


            if(this.model.get('id')!==undefined) {
                this.model.fetch({
                    success:function(){
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
            this.model.set('interviewer_1_id', parseInt(self.model.get('interviewer_1_id')));
            this.model.set('interviewer_2_id', parseInt(self.model.get('interviewer_2_id')));
            this.model.set('recruiter_id', parseInt(self.model.get('recruiter_id')));
            this.model.set('round_id', parseInt(self.model.get('round_id')));
            this.model.set('status_id', parseInt(self.model.get('status_id')));
            var  date =  this.model.get('interviewDate');
            date = date.substring(0 , 10);
            console.log(date);
            this.model.set('interviewDate', date);

            this.model.save(self.model.toJSON(), {
                success: function(model,response) {
                    Events.trigger("alert:success", [{
                        message: "Record successfully."
                    }]);
                    Events.trigger("view:navigate", {
                        path: "interviewList",
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