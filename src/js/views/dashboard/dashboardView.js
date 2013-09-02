define(function(require) {
    'use strict';

    var _ = require('underscore'),
    $ = require('jquery'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    dashboardTemplate = require('template!templates/dashboard/dashboard'),
    EditDeleteInterviewModel = require('models/dashboard/editDeleteInterviewModel'),
    Events = require('events'),
    Core = require('core'),
    FuelUxDataSource = require('fueluxDataSource');

    require('jqueryCookie');
    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var Dashboard = Backbone.View.extend({
        initialize: function() {
            this.editDeleteInterviewModel = new EditDeleteInterviewModel();
            Events.on('deleteInterview', this.render);
        },

        el: '.page',

        events: {
            'click .edit': 'editInterview',
            'click .delete': 'deleteInterview'
            // 'loaded #MyGrid': 'gridStyleFilter'
        },

        render: function () {
            var self = this;
            this.collection.fetch({
                success: function() {
                    self.$el.html(dashboardTemplate);
                    self.createDataGrid(self.usersData(self.collection.toJSON()));
                }
            });
            return this;
        },

        getInterviewer: function(empID) {
            var emp = _.find(Core.globals.interviewer_list, function(interviewer) {
                return interviewer.empid == empID;
            })
            return emp.firstname+" "+emp.lastname;
        },

        getRecruiter: function(empID) {
            var emp = _.find(Core.globals.recruiter_list, function(recruiter) {
                return recruiter.empid == empID;
            })
            return emp.firstname+" "+emp.lastname;
        },

        getStatus: function(statusID) {
            var stat = _.find(Core.globals.interviewstatus_list, function(status){
                return status.id == statusID;
            })
            return stat.status;
        },

        getRound: function(roundID) {
            var rnd = _.find(Core.globals.interviewrounds_list, function(rounds){
                return rounds.id == roundID;
            })
            return rnd.round;
        },

        getMode: function(modeID) {
            var mod = _.find(Core.globals.interviewmode_list, function(modes){
                return modes.id == modeID;
            })
            return mod.mode;
        },

        editInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var editId = this.$(e.target).closest('tr td span').attr('data-id');
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
            var deleteId = this.$(e.target).closest('tr td span').attr('data-id');
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
        },

        usersData: function(Userlist) {
            var userlistObj = {};
            var userslistObj = [];
            var self = this;
            var operationHTML = "";

            _.each(Userlist, function(userlist) {
                operationHTML = '<span data-id='+userlist.id+' data-status='+self.getStatus(userlist.status_id)+'><button class="btn btn-small btn-primary edit" type="button"><i class="icon-edit icon-white"></i> Edit</button>';
                operationHTML += ' <button class="btn btn-small btn-danger delete" type="button"><i class="icon-trash icon-white"></i> Delete</button></span>';

                // userlist.selectRows = "<input type='checkbox' class='selectrows' data-id="+userlist.id+">";
                userlist.interviewer_1_id = self.getInterviewer(userlist.interviewer_1_id);
                userlist.interviewer_2_id = self.getInterviewer(userlist.interviewer_2_id);
                userlist.recruiter_id = self.getRecruiter(userlist.recruiter_id);
                userlist.status_id = self.getStatus(userlist.status_id);
                userlist.round_id = self.getRound(userlist.round_id);
                userlist.mode_id = self.getMode(userlist.mode_id);

                userlistObj = _.object([
                    // "selectrows",
                    "candiateName",
                    "interviewer_1_id",
                    "interviewer_2_id",
                    "recruiter_id",
                    "status_id",
                    "round_id",
                    "mode_id",
                    "description",
                    "operations"
                ], [
                    // userlist.selectRows,
                    userlist.candiateName,
                    userlist.interviewer_1_id,
                    userlist.interviewer_2_id,
                    userlist.recruiter_id,
                    userlist.status_id,
                    userlist.round_id,
                    userlist.mode_id,
                    userlist.description,
                    operationHTML
                ]);
                userslistObj.push(userlistObj);
            });

            return userslistObj;
        },

        createDataGrid: function(userslistObj){
            var DataSource = new FuelUxDataSource({
                columns: [
                    // {
                    //     property: "selectrows",
                    //     label: "<input type='checkbox' id='selectUsersAtOnce'>",
                    //     sortable: false
                    // },
                    {
                        property: "candiateName",
                        label: "Candiate Name",
                        sortable: true
                    },
                    {
                        property: "interviewer_1_id",
                        label: "Interview 1",
                        sortable: true
                    },
                    {
                        property: "interviewer_2_id",
                        label: "Interview 2",
                        sortable: true
                    },
                    {
                        property: "recruiter_id",
                        label: "Recruiter",
                        sortable: true
                    },
                    {
                        property: "status_id",
                        label: "Status",
                        sortable: true
                    },
                    {
                        property: "round_id",
                        label: "Round",
                        sortable: true
                    },
                    {
                        property: "mode_id",
                        label: "Mode",
                        sortable: true
                    },
                    {
                        property: "description",
                        label: "Remarks",
                        sortable: false
                    },
                    {
                        property: "operations",
                        label: "Operations",
                        sortable: false
                    }
                ],
                data: userslistObj,
                delay: 250
            });

            $('#MyGrid').datagrid({
                dataSource: DataSource,
                dataOptions:{
                    pageIndex: 0,
                    pageSize: 5
                },
                stretchHeight: false
            })
        }

        // gridStyleFilter: function(e) {
        //     var statusFilter = this.$(e.target).find('tr td span').attr('data-status');
        //     var html = this.$(statusFilter).find('tr');
        //     console.log(html);
        //     if(statusFilter==='OnHold') {
        //         this.$(html).addClass('warning')
        //     } else if(statusFilter==='Selected') {

        //     } else if(statusFilter==='Call for F2F round') {

        //     } else if(statusFilter==='Rejected') {

        //     }
        // }
    });

    return Dashboard;
});
