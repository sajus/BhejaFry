define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Events = require('events'),
    recruitersListTemplate = require('template!templates/manage/recruiters/recruitersList'),
    RecruiterCollection = require('collections/interview/recruiterCollection'),
    DeleteRecruitersModel = require('models/manage/recruiters/recruitersListDetailModel'),
    FuelUxDataSource = require('fueluxDataSource');

    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var RecruitersList = Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.deleteRecruitersModel = new DeleteRecruitersModel();
        },

        events: {
            'click .editRecruiters': 'editInterviewers',
            'click .delete': 'deleteInterviewers'
        },

        render: function () {
            var self = this;
            this.$el.html(recruitersListTemplate);
            this.recruiterCollection = new RecruiterCollection();
            this.recruiterCollection.fetch({
                success: function() {
                    self.createDataGrid(self.usersData(self.recruiterCollection.toJSON()));
                }
            });
            return this;
        },

        editInterviewers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var editId = this.$(e.target).closest('tr td span').attr('data-id');
            Events.trigger("view:navigate", {
                path: "mgnRecruitersDetail/" + editId,
                options: {
                    trigger: true
                }
            });
        },

        deleteInterviewers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var self = this;
            var deleteId = this.$(e.target).closest('tr td span').attr('data-id');

            this.deleteRecruitersModel.set({id:deleteId});
            this.deleteRecruitersModel.destroy({
                success: function() {
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
                operationHTML = '<span data-id='+userlist.empid+'><button class="btn btn-small btn-primary editRecruiters" type="button"><i class="icon-edit icon-white"></i> Details</button>';
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

        createDataGrid: function(userslistObj){
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
                    },
                    {
                        property: "firstName",
                        label: "First Name",
                        sortable: true
                    },
                    {
                        property: "lastName",
                        label: "Last Name",
                        sortable: true
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
    });

    return RecruitersList;
});
