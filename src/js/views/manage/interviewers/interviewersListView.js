define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    interviewersListTemplate = require('template!templates/manage/interviewers/interviewersList'),
    InterviewerCollection = require('collections/interview/interviewerCollection'),
    FuelUxDataSource = require('fueluxDataSource');

    require('fueluxDataGrid');
    require('fueluxSelectBox');
    require('fueluxSearchBox');

    var InterviewersListView = Backbone.View.extend({

        el: '.page',

        render: function () {
            var self = this;
            this.$el.html(interviewersListTemplate);
            this.interviewerCollection = new InterviewerCollection();
            this.interviewerCollection.fetch({
                success: function() {
                    self.createDataGrid(self.usersData(self.interviewerCollection.toJSON()));
                }
            });
            return this;
        },

        usersData: function(Userlist) {
            var userlistObj = {};
            var userslistObj = [];
            var self = this;
            var operationHTML = "";

            _.each(Userlist, function(userlist) {
                operationHTML = '<span data-id='+userlist.empid+'><button class="btn btn-small btn-primary edit" type="button"><i class="icon-edit icon-white"></i> Details</button>';
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

    return InterviewersListView;
});
