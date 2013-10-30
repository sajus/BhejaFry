define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Events = require('events'),
        interviewersListTemplate = require('template!templates/manage/interviewers/interviewersList'),
        InterviewerCollection = require('collections/interview/interviewerCollection'),
        DeleteInterviewersModel = require('models/manage/interviewers/interviewersListDetailModel'),
        FuelUxDataSource = require('fueluxDataSource');

    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var InterviewersListView = Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.deleteInterviewersModel = new DeleteInterviewersModel();
            this.render();
        },

        events: {
            'click .editInterviewer': 'editInterviewers',
            'click .delete': 'deleteInterviewers'
        },

        render: function() {
            var view = this;
            this.$el.html(interviewersListTemplate);
            this.interviewerCollection = new InterviewerCollection();
            this.interviewerCollection.fetch({
                success: function() {
                    view.createDataGrid(view.usersData(view.interviewerCollection.toJSON()));
                }
            });
            return this;
        },

        editInterviewers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var editId = this.$(e.target).closest('tr td span').attr('data-id');
            Events.trigger("view:navigate", {
                path: "mgnInterviewersDetail/" + editId,
                options: {
                    trigger: true
                }
            });
        },

        deleteInterviewers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var view = this;
            var deleteId = this.$(e.target).closest('tr td span').attr('data-id');

            this.deleteInterviewersModel.set({
                id: deleteId
            });
            this.deleteInterviewersModel.destroy({
                success: function() {
                    view.render();
                    Events.trigger("alert:success", [{
                        message: "Record deleted successfully"
                    }]);

                },
                error: function() {
                    Events.trigger("alert:error", [{
                        message: "Some error got triggered white deleting record"
                    }]);
                }
            });
        },

        usersData: function(Userlist) {
            var userlistObj = {};
            var userslistObj = [];
            var view = this;
            var operationHTML = "";

            _.each(Userlist, function(userlist) {
                operationHTML = '<span data-id=' + userlist.empid + '><button class="btn btn-small btn-primary editInterviewer" type="button"><i class="icon-edit icon-white"></i> Details</button>';
                // operationHTML += ' <button class="btn btn-small btn-info detail" type="button"><i class="icon-share icon-white"></i> Detail</button></span>';
                operationHTML += ' <button class="btn btn-small btn-danger delete" type="button"><i class="icon-trash icon-white"></i> Delete</button></span>';

                // userlist.selectRows = "<input type='checkbox' class='selectrows' data-id="+userlist.id+">";

                userlistObj = _.object([
                    // "selectrows",
                    "empid",
                    "firstName",
                    "lastName",
                    "operations"
                ], [
                    // userlist.selectRows,
                    userlist.empid,
                    userlist.firstname,
                    userlist.lastname,
                    operationHTML
                ]);
                userslistObj.push(userlistObj);
            });

            return userslistObj;
        },

        createDataGrid: function(userslistObj) {
            var DataSource = new FuelUxDataSource({
                columns: [
                    // {
                    //     property: "selectrows",
                    //     label: "<input type='checkbox' id='selectUsersAtOnce'>",
                    //     sortable: false
                    // },
                    {
                        property: "empid",
                        label: "Employee ID",
                        sortable: true
                    }, {
                        property: "firstName",
                        label: "First Name",
                        sortable: true
                    }, {
                        property: "lastName",
                        label: "Last Name",
                        sortable: true
                    }, {
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
                dataOptions: {
                    pageIndex: 0,
                    pageSize: 5
                },
                stretchHeight: false
            });
        }
    });

    return InterviewersListView;
});