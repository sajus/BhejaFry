define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Baseview = require('views/baseview'),
        Events = require('events'),
        interviewListDetailPageTemplate = require('template!templates/interview/interviewListDetail'),
        InterviewListDetailModel = require('models/interview/interviewListDetailModel'),
        moment = require('moment');

    require('css!vendors/bootstrap/plugins/datepicker/css/datepicker3.css');
    require('css!vendors/jquery/plugins/chosen/chosen.min.css');
    require('modelBinder');
    require('modelValidator');
    require('chosen');
    require('bsAlert');
    require('datePicker');

    return Baseview.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
            this.model = new InterviewListDetailModel({
                'id': this.id
            });

            this.interviewers = [];
            this.interviewmode = [];
            this.interviewrounds = [];
            this.interviewstatus = [];
            this.recruiter = [];

            this.populateInterviewer();
            this.populateMode();
            this.populateRounds();
            this.populateStatus();
            this.populateRecruiter();
        },

        fetchData: function(service) {
            return $.ajax({
                url: Backbone.Model.gateWayUrl + '/' + service
            });
        },

        populateInterviewer: function() {
            var view = this;
            this.fetchData('interviewer').done(function(interviewer_list) {
                _.each(interviewer_list, function(data) {
                    view.interviewers.push(_.object([
                        "empid",
                        "firstname",
                        "lastname"
                    ], [
                        data.empid,
                        data.firstname,
                        data.lastname
                    ]));
                });
            });
        },

        populateMode: function() {
            var view = this;
            this.fetchData('mode').done(function(interviewmode_list) {
                _.each(interviewmode_list, function(data) {
                    view.interviewmode.push(_.object([
                        "id",
                        "mode"
                    ], [
                        data.id,
                        data.mode
                    ]));
                });
            });
        },

        populateStatus: function() {
            var view = this;
            this.fetchData('status').done(function(interviewstatus_list) {
                _.each(interviewstatus_list, function(data) {
                    view.interviewstatus.push(_.object([
                        "id",
                        "status"
                    ], [
                        data.id,
                        data.status
                    ]));
                });
            });
        },

        populateRounds: function() {
            var view = this;
            this.fetchData('rounds').done(function(interviewrounds_list) {
                _.each(interviewrounds_list, function(data) {
                    view.interviewrounds.push(_.object([
                        "id",
                        "round"
                    ], [
                        data.id,
                        data.round
                    ]));
                });
            });
        },

        populateRecruiter: function() {
            var view = this;
            this.fetchData('recruiter').done(function(recruiter_list) {
                _.each(recruiter_list, function(data) {
                    view.recruiter.push(_.object([
                        "empid",
                        "firstname",
                        "lastname"
                    ], [
                        data.empid,
                        data.firstname,
                        data.lastname
                    ]));
                });
                view.render();
            });
        },

        events: {
            'submit .interviewForm': 'processForm',
            'change :input, change select, blur :input, blur select': 'processField',
            'click .pickerShow': 'showDatePicker',
            'click .cancelInterviewForm': 'cancelForm'
        },

        showDatePicker: function() {
            this.$el.find('#interviewDate').datepicker('show');
        },

        cancelForm: function() {
            Events.trigger("view:navigate", {
                path: "interviewList",
                options: {
                    trigger: true
                }
            });
        },

        render: function() {
            var view = this;

            this.$el.html(interviewListDetailPageTemplate({
                mode: this.interviewmode,
                interviewers: this.interviewers,
                recruiter: this.recruiter,
                rounds: this.interviewrounds,
                interviewStatus: this.interviewstatus,
                editMode: (this.model.get('id')) ? true : false
            }));

            if (this.id !== null) {
                this.model.fetch({
                    success: function() {
                        view.modelBinder.bind(view.model, view.el);
                        var possibleData = view.model.toJSON();
                        view.$el.find('.modes').val(possibleData.mode_id).trigger("chosen:updated").change();
                        view.$el.find('.recruiters').val(possibleData.recruiter_id).trigger("chosen:updated").change();
                        view.$el.find('.rounds').val(possibleData.round_id).trigger("chosen:updated").change();
                        view.$el.find('.status').val(possibleData.status_id).trigger("chosen:updated").change();
                        view.$el.find('.interviewers').val([possibleData.interviewer_1_id, possibleData.interviewer_2_id]).trigger("chosen:updated").change();
                        view.$el.find('#interviewDate').datepicker('update', moment(possibleData.interviewDate).format('DD MMMM YY, dddd'));
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
            this.$el.find('#interviewDate').datepicker({
                "autoclose": true,
                "format": 'dd MM yyyy, DD',
                "todayHighlight": true
            }).data('datepicker');

            this.$el.find('input[name="cEmail"]').focus();

            this.$('.interviewers').chosen({
                max_selected_options: 2
            });

            this.$('.modes').chosen({
                allow_single_deselect: true
            });

            this.$('.recruiters').chosen({
                allow_single_deselect: true
            });

            this.$('.rounds').chosen({
                allow_single_deselect: true
            });

            this.$('.status').chosen({
                allow_single_deselect: true
            });

            if (this.model.get('id')) {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Edit Interview Details</li>");
            } else {
                $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Add Interview Details</li>");
            }
        },

        postData: function() {
            var view = this;

            this.model.set('interviewer_1_id', Number(_.first(view.model.get('interviewers'))));
            this.model.set('interviewer_2_id', Number(_.last(view.model.get('interviewers'))));
            this.model.set('recruiter_id', Number(view.model.get('recruiters')));
            this.model.set('round_id', Number(view.model.get('rounds')));
            this.model.set('status_id', Number(view.model.get('status')));
            this.model.set('mode_id', Number(view.model.get('modes')));
            this.model.set('interviewDate', moment(this.$el.find('#interviewDate').datepicker('getDate')).format('X'));

            var message = (this.id !== null) ? "Interview get updated successfully." : "Interview get saved successfully.";
            this.model.save(view.model.toJSON(), {
                success: function(model, response) {
                    Events.trigger("alert:success", [{
                        message: message
                    }]);
                    Events.trigger("view:navigate", {
                        path: "interviewList",
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