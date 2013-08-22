define(function(require) {

    'use strict';
    var _ = require('underscore');
    var Backbone = require('backbone');
    var dashboardTemplate = require('template!templates/dashboard/dashboard');
    var EditDeleteInterviewModel = require('models/dashboard/editDeleteInterviewModel');
    var Events = require('events');
    var Core = require('core');

    require('jqueryCookie');

    /* Handlebars register helper to convert Number to readable text */
    Handlebars.registerHelper('getInterviewer', function(empID) {
        var emp = _.find(Core.globals.interviewer_list, function(interviewer){
            return interviewer.empid == empID;
        })
        return emp.firstname+" "+emp.lastname;
    });

    Handlebars.registerHelper('getRecruiter', function(empID) {
        var emp = _.find(Core.globals.recruiter_list, function(recruiter){
            return recruiter.empid == empID;
        })
        return emp.firstname+" "+emp.lastname;
    });

    Handlebars.registerHelper('getStatus', function(statusID) {
        var stat = _.find(Core.globals.interviewstatus_list, function(status){
            return status.id == statusID;
        })
        return stat.status;
    });

    Handlebars.registerHelper('getRound', function(roundID) {
        var rnd = _.find(Core.globals.interviewrounds_list, function(rounds){
            return rounds.id == roundID;
        })
        return rnd.round;
    });

    Handlebars.registerHelper('getMode', function(modeID) {
        var mod = _.find(Core.globals.interviewmode_list, function(modes){
            return modes.id == modeID;
        })
        return mod.mode;
    });

    var Dashboard = Backbone.View.extend({

        initialize: function() {
            this.editDeleteInterviewModel = new EditDeleteInterviewModel();
            Events.on('deleteInterview',this.render);
        },

        el: '.page',

        events: {
            'click .edit': 'editInterview',
            'click .delete': 'deleteInterview'
        },

        render: function () {
            console.log('render');
            var self = this;
            this.collection.fetch({
                success: function() {
                    self.$el.html(dashboardTemplate({interviewList: self.collection.toJSON()}));
                }
            });
            return this;
        },

        editInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var editId = this.$(e.target).closest('tr').attr('data-id');
            Events.trigger("view:navigate", {
                path: "interview/" + editId,
                options: {
                    trigger: true
                }
            });
        },

        deleteInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var self = this;
            var deleteId = this.$(e.target).closest('tr').attr('data-id');
            this.editDeleteInterviewModel.set({id:deleteId});
            this.editDeleteInterviewModel.destroy({
                success: function() {
                    //Events.trigger('deleteInterview');
                    self.render();
                    Events.trigger("alert:success", [{
                        message: "Record deleted successfully"
                    }]);
                    
                },
                error: function() {
                    Events.trigger("alert:error", [{
                        message: "Some error got triggered white deleting record"
                    }]);
                }
            })
        }
    });

    return Dashboard;
});
