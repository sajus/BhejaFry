define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Events = require('events'),
        usersListTemplate = require('template!templates/users/usersList'),
        UsersCollection = require('collections/users/usersCollection'),
        DeleteUsersModel = require('models/users/usersListDetailModel'),
        FuelUxDataSource = require('fueluxDataSource');

    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var UsersListView = Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.deleteUsersModel = new DeleteUsersModel();
            this.render();
        },

        events: {
            'click .editUser': 'editInterviewers',
            'click .delete': 'deleteInterviewers'
        },

        render: function() {
            var self = this;
            this.$el.html(usersListTemplate);
            this.usersCollection = new UsersCollection();
            this.usersCollection.fetch({
                success: function() {
                    self.createDataGrid(self.usersData(self.usersCollection.toJSON()));
                }
            });
            return this;
        },

        editInterviewers: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var editId = this.$(e.target).closest('tr td span').attr('data-id');
            Events.trigger("view:navigate", {
                path: "usersDetail/" + editId,
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

            this.deleteUsersModel.set({
                id: deleteId
            });
            this.deleteUsersModel.destroy({
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
            });
        },

        usersData: function(Userlist) {
            var userlistObj = {};
            var userslistObj = [];
            var self = this;
            var operationHTML = "";

            _.each(Userlist, function(userlist) {
                operationHTML = '<span data-id=' + userlist.empid + '><button class="btn btn-small btn-primary editUser" type="button"><i class="icon-edit icon-white"></i> Details</button>';
                // operationHTML += ' <button class="btn btn-small btn-info detail" type="button"><i class="icon-share icon-white"></i> Detail</button></span>';
                operationHTML += ' <button class="btn btn-small btn-danger delete" type="button"><i class="icon-trash icon-white"></i> Delete</button></span>';

                // userlist.selectRows = "<input type='checkbox' class='selectrows' data-id="+userlist.id+">";
                userlist.accesstype = userlist.accesstype === 0 ? "User" : "Administrator";

                userlistObj = _.object([
                    // "selectrows",
                    "empid",
                    "email",
                    "firstName",
                    "lastName",
                    "accessType",
                    "operations"
                ], [
                    // userlist.selectRows,
                    userlist.empid,
                    userlist.email,
                    userlist.firstname,
                    userlist.lastname,
                    userlist.accesstype,
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
                        property: "email",
                        label: "Email",
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
                        property: "accessType",
                        label: "Access Level",
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

    return UsersListView;
});