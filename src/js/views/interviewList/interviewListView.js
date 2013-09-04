define(function(require) {
    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Handlebars = require('handlebars'),
    interviewListTemplate = require('template!templates/interviewList/interviewList'),
    // DelIvListModalView = require('views/interviewList/delIvListModalView'),
    EditDeleteInterviewModel = require('models/interviewList/editDeleteInterviewModel'),
    InterviewListCollection = require('collections/interviewList/interviewListCollection'),
    Events = require('events'),
    Core = require('core'),
    FuelUxDataSource = require('fueluxDataSource');

    require('jqueryCookie');
    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var InterviewListView = Backbone.View.extend({
        initialize: function() {
            this.editDeleteInterviewModel = new EditDeleteInterviewModel();
            this.collection = new InterviewListCollection();
            Events.on('deleteInterview', this.render);
        },

        el: '.page',

        events: {
            'click .edit': 'editInterview',
            'click .delete': 'deleteInterview',
            'loaded #MyGrid': 'gridStyleFilter'
        },

        render: function () {
            var self = this;
            this.collection.fetch({
                success: function() {
                    self.$el.html(interviewListTemplate);
                    self.createDataGrid(self.usersData(self.collection.toJSON()));
                }
            });
            return this;
        },

        getInterviewer: function(empID) {
            if(empID!==null) {
                var emp = _.find(Core.globals.interviewer_list, function(interviewer) {
                    return interviewer.empid == empID;
                })
                return emp.firstname+" "+emp.lastname;
            }
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

            // var delIvListModalView = new DelIvListModalView();

            // this.$('.modal-container').html(delIvListModalView.render(deleteId).el);
            // this.$('#deleteModal').modal({backdrop:'static'});

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
                // operationHTML += ' <button class="btn btn-small btn-info detail" type="button"><i class="icon-share icon-white"></i> Detail</button></span>';
                operationHTML += ' <button class="btn btn-small btn-danger delete" type="button"><i class="icon-trash icon-white"></i> Delete</button></span>';
                var interviewer2 = self.getInterviewer(userlist.interviewer_2_id)
                if(interviewer2===undefined) {
                    userlist.interviewer_2_id = 'N/A'
                } else {
                    userlist.interviewer_2_id = interviewer2;
                }
                // userlist.selectRows = "<input type='checkbox' class='selectrows' data-id="+userlist.id+">";
                userlist.interviewer_1_id = self.getInterviewer(userlist.interviewer_1_id);
                userlist.interviewer_2_id = userlist.interviewer_2_id;
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
                    // "description",
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
                    // userlist.description,
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
                    // {
                    //     property: "description",
                    //     label: "Remarks",
                    //     sortable: false
                    // },
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
        },

        gridStyleFilter: function(e) {

            $("#MyGrid tr").each(function(index, trList){

                if($(trList).find('td').eq(4).text()==='OnHold') {
                    $(trList).find('td').css('font-weight','bold');
                    $(trList).find('td').eq(4).parent().addClass('warning text-warning');
                } else if($(trList).find('td').eq(4).text()==='Selected') {
                    $(trList).find('td').css('font-weight','bold');
                    $(trList).find('td').eq(4).parent().addClass('success text-success');
                } else if($(trList).find('td').eq(4).text()==='Call for F2F round') {
                    $(trList).find('td').css('font-weight','bold');
                    $(trList).find('td').eq(4).parent().addClass('info text-info');
                } else if($(trList).find('td').eq(4).text()==='Rejected') {
                    $(trList).find('td').css('font-weight','bold');
                    $(trList).find('td').eq(4).parent().addClass('error text-error');
                }
            });
        }
    });

    return InterviewListView;
});
