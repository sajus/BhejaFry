define(function(require) {

    'use strict';

    var $ = require('jquery');
    var _ = require('underscore');
    var Backbone = require('backbone');
    var Core = require('core');
    var Events = require('events');
    var BaseView = require('views/BaseView');
    var interviewCreateEditPageTemplate = require('template!templates/interview/interviewCreateEdit');
    var InterviewEditModel = require('models/interview/interviewEditModel');

    require('modelBinder');
    require('bootstrapAlert');
    require('jqueryCookie');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this._modelBinder = new Backbone.ModelBinder();

            if(this.model.get('id')!==undefined) {
                this.interviewEditModel = new InterviewEditModel({id:this.model.get('id')});
                var self = this;
                self.interviewEditModel.fetch({
                    success: function() {
                        var object = self.interviewEditModel.toJSON();
                        self.$el.find("#candiateName").val(object.candiateName);
                        self.$el.find("#mode option[value='"+object.mode_id+"']").prop('selected', true);
                        self.$el.find("#interviewer1 option[value='"+object.interviewer_1_id+"']").prop('selected', true);
                        self.$el.find("#interviewer2 option[value='"+object.interviewer_2_id+"']").prop('selected', true);
                        self.$el.find("#recruiter option[value='"+object.recruiter_id+"']").prop('selected', true);
                        self.$el.find("#rounds option[value='"+object.status_id+"']").prop('selected', true);
                        self.$el.find("#status option[value='"+object.round_id+"']").prop('selected', true);
                        self.$el.find("#remarks").val(object.description);

                        self.interviewEditModel.set({
                            "candiateName": self.$el.find("#candiateName").val(),
                            "mode_id": self.$el.find("#mode").val(),
                            "interviewer_1_id": self.$el.find("#interviewer1").val(),
                            "interviewer_2_id": self.$el.find("#interviewer2").val(),
                            "recruiter_id": self.$el.find("#recruiter").val(),
                            "status_id": self.$el.find("#rounds").val(),
                            "round_id": self.$el.find("#status").val(),
                            "description": self.$el.find("#remarks").val()
                        });

                    },
                    error: function() {
                        console.log("Error");
                    }
                });
            }

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
            'change :input, blue :input': 'processField',
            'click #addCancel': 'addCancel'
        },

        render: function() {
            var self = this;
            var addUserText = (this.model.get('id'))?"Save":"Add new interview";
            var title = (this.model.get('id'))?"Update interview detail":"Add new interview detail"
            this.$el.html(interviewCreateEditPageTemplate({
                mode: this.interviewmode,
                interviewer1: this.interviewer,
                interviewer2: this.interviewer,
                recruiter: this.recruiter,
                rounds: this.interviewrounds,
                interviewStatus: this.interviewstatus,
                addUserText:addUserText,
                title:title
            }));

            if(this.model.get('id')!==undefined) {
                self._modelBinder.bind(self.interviewEditModel, self.interviewEditModel.el);
            } else {
                self._modelBinder.bind(self.model, self.el);
            }

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        },

        postData: function() {
            var self = this;
            if(this.model.get('id')!==undefined) {
                self.interviewEditModel.set({
                    "candiateName": self.$el.find("#candiateName").val(),
                    "mode_id": self.$el.find("#mode").val(),
                    "interviewer_1_id": self.$el.find("#interviewer1").val(),
                    "interviewer_2_id": self.$el.find("#interviewer2").val(),
                    "recruiter_id": self.$el.find("#recruiter").val(),
                    "status_id": self.$el.find("#rounds").val(),
                    "round_id": self.$el.find("#status").val(),
                    "description": self.$el.find("#remarks").val()
                });
                self.interviewEditModel.save(self.interviewEditModel.toJSON(), {
                    success: function(model,response) {
                        Events.trigger("alert:success", [{
                            message: "Updated record successfully."
                        }]);
                        Events.trigger("view:navigate", {
                            path: "dashboard",
                            options: {
                                trigger: true
                            }
                        });
                    },
                    error: function(model,response) {
                        Events.trigger("alert:error", [{
                            message: "Some service error occured during data Saving."
                        }]);
                    }
                });
            } else {
                self.model.save(self.model.toJSON(), {
                    success: function(model,response) {
                        Events.trigger("alert:success", [{
                            message: "Insert record successfully."
                        }]);
                        Events.trigger("view:navigate", {
                            path: "dashboard",
                            options: {
                                trigger: true
                            }
                        });
                    },
                    error: function(model,response) {
                        Events.trigger("alert:error", [{
                            message: "Some service error occured during data Saving."
                        }]);
                    }
                });
            }
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