define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Core = require('core'),
        Events = require('events'),
        BaseView = require('views/BaseView'),
        interviewListDetailPageTemplate = require('template!templates/interview/interviewListDetail'),
        moment = require('moment');

    require('css!vendors/bootstrap/plugins/datepicker/datepicker.css');
    require('css!vendors/jquery/plugins/chosen/chosen.min.css');
    require('modelBinder');
    require('chosen');
    require('modelValidator');
    require('bsAlert');
    require('datePicker');

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
            var view = this;

            _.each(Core.globals.interviewmode_list, function(data) {
                view.interviewmode_list = _.object([
                    "id",
                    "mode"
                ], [
                    data.id,
                    data.mode
                ]);
                view.interviewmode.push(view.interviewmode_list);
            });
            _.each(Core.globals.interviewer_list, function(data) {
                view.interviewer_list = _.object([
                    "empid",
                    "firstname",
                    "lastname"
                ], [
                    data.empid,
                    data.firstname,
                    data.lastname
                ]);
                view.interviewer.push(view.interviewer_list);
            });
            _.each(Core.globals.interviewrounds_list, function(data) {
                view.interviewrounds_list = _.object([
                    "id",
                    "round"
                ], [
                    data.id,
                    data.round
                ]);
                view.interviewrounds.push(view.interviewrounds_list);
            });
            _.each(Core.globals.recruiter_list, function(data) {
                view.recruiter_list = _.object([
                    "empid",
                    "firstname",
                    "lastname"
                ], [
                    data.empid,
                    data.firstname,
                    data.lastname
                ]);
                view.recruiter.push(view.recruiter_list);
            });
            _.each(Core.globals.interviewstatus_list, function(data) {
                view.interviewstatus_list = _.object([
                    "id",
                    "status"
                ], [
                    data.id,
                    data.status
                ]);
                view.interviewstatus.push(view.interviewstatus_list);
            });
            this.render();
        },

        events: {
            'submit .form-horizontal': 'processForm',
            'change :input select': 'processField',
            'keypress #interviewDate': 'preventAction',
            'mousedown .pickerShow': 'showPicker',
            'click .addNewList': 'resetForm'
        },

        preventAction: function(e) {
            e.preventDefault();
        },

        resetForm: function() {
            this.$el.find('#candiateName').val('');
            this.$el.find('#remarks').val('');
        },

        showPicker: function(e) {
            this.$el.find('.date').datepicker({
                "autoclose": true
            }).data('datepicker');
        },

        render: function() {
            var view = this;
            var addUserText = (this.model.get('id')) ? "Update" : "Save";
            var title = this.model.get('id') ? "Edit existing interview" : "Add new interview";

            this.$el.find('.date').datepicker({
                "autoclose": true
            }).data('datepicker');

            this.$el.html(interviewListDetailPageTemplate({
                mode: this.interviewmode,
                interviewer1: this.interviewer,
                interviewer2: this.interviewer,
                interviewDate: moment(this.interviewDate).format('DD-MMM-YYYY'),
                recruiter: this.recruiter,
                rounds: this.interviewrounds,
                interviewStatus: this.interviewstatus,
                addUserText: addUserText,
                title: title
            }));


            if (this.model.get('id') !== undefined) {
                this.model.fetch({
                    success: function() {
                        view.modelBinder.bind(view.model, view.el);
                    }
                });
            } else {
                view.modelBinder.bind(view.model, view.el);
            }

            this.$('#interviewer1').chosen({
                allow_single_deselect: true,
                max_selected_options: 2
            });
            this.$('#mode').chosen({
                allow_single_deselect: true
            });
            this.$('#recruiter').chosen({
                allow_single_deselect: true
            });
            this.$('#rounds').chosen({
                allow_single_deselect: true
            });
            this.$('#status').chosen({
                allow_single_deselect: true
            });
            // this.$('#interviewer1').css('width', '55%');
            this.$('.chosen-container').css({
                'margin-top': '5px'
            });

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            $('.viewTitle').html('<h1>Interviews Detail</h1>');

            return this;
        },

        postData: function() {
            var view = this;
            this.model.set('interviewer_1_id', parseInt(view.model.get('interviewer_1_id'), 10));
            this.model.set('interviewer_2_id', parseInt(view.model.get('interviewer_2_id'), 10));
            this.model.set('recruiter_id', parseInt(view.model.get('recruiter_id'), 10));
            this.model.set('round_id', parseInt(view.model.get('round_id'), 10));
            this.model.set('status_id', parseInt(view.model.get('status_id'), 10));
            this.model.set('interviewDate', this.$('#interviewDate').val());

            this.model.save(view.model.toJSON(), {
                success: function(model, response) {
                    Events.trigger("alert:success", [{
                        message: "Record successfully."
                    }]);
                    // Events.trigger("view:navigate", {
                    //     path: "interviewList",
                    //     options: {
                    //         trigger: true
                    //     }
                    // });
                },
                error: function(model, response) {
                    Events.trigger("alert:error", [{
                        message: "Some service error occured during data Saving."
                    }]);
                }
            });
        }
    });
});