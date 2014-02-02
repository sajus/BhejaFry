define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        usersListTemplate = require('template!templates/users/usersList'),
        UsersCollection = require('collections/users/usersCollection'),
        ConfirmDelModal = require('views/users/userDelConfirmModal'),
        DeleteUsersModel = require('models/users/usersListDetailModel');

    require('css!vendors/jquery/plugins/datatables/css/jquery.dataTables.css');
    require('css!vendors/jquery/plugins/datatables/css/dataTables_themeroller.css');
    require('css!vendors/jquery/plugins/datatables/css/smoothness/jquery-ui-1.8.4.custom.css');
    require('dataTables');

    var UsersListView = Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.deleteUsersModel = new DeleteUsersModel();
            this.usersCollection = new UsersCollection();
            this.render();
        },

        events: {
            'click .editUser': 'editUser',
            'click .delUser, .delAtOnces': 'deleteUser',
            'click .selectedRow': 'selectedRow',
            'click .selectedRowHeader': 'selectedRowHeader',
            'click .addNewUser': 'addNewUser'
        },

        fetchUsersList: function() {
            return this.usersCollection.fetch();
        },

        render: function() {
            var view = this;
            $.when(this.fetchUsersList())
                .done(function(data) {
                    view.$el.html(usersListTemplate({
                        users: data
                    }));
                    view.$el.find('.userslist').dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "sScrollY": "200px",
                        "sScrollX": "100%",
                        "sScrollXInner": "110%",
                        "bScrollCollapse": true,
                        "language": {
                            "search": ""
                        },
                        "aoColumnDefs": [{
                            "bSortable": false,
                            "aTargets": [0, 5]
                        }],
                        "bLengthChange": false
                    });
                    view.$el.find('#dataTable_filter :input').addClass('form-control').prop('placeholder', 'Search all columns').focus();
                })
                .fail(function(error) {
                    console.log('Error: ' + error);
                });

            this.uxFormation();

            return this;
        },

        uxFormation: function() {
            $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Users List</li>");
        },

        editUser: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "usersDetail/" + this.$(e.target).closest('tr').attr('data-email'),
                options: {
                    trigger: true
                }
            });
        },

        deleteUser: function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.listenTo(Events, 'deletedUser', this.render);
            var confirmDelModal = new ConfirmDelModal();

            var targetDelete = {};
            var ids = [];

            ids.push(this.$(e.target).closest('tr').attr('data-id'));
            targetDelete['ids'] = ids;

            if (this.$(e.target).hasClass('delAtOnces')) {
                targetDelete = {};
                ids = [];
                this.$('.selectedRow:checked').each(function() {
                    ids.push($(this).val());
                });
                targetDelete['ids'] = ids;
            }

            $('.modal-container').html(confirmDelModal.render(targetDelete).el);
            $('.modal-container .modal').modal('show');
        },

        selectedRow: function(e) {
            e.stopPropagation();
            var selectedRow = e.target.parentNode.parentNode;
            var view = this;
            this.$($(e.target).closest('input[type="checkbox"]')).prop('checked', function() {
                if (this.checked) {
                    view.$(selectedRow).addClass('warning');
                } else {
                    view.$(selectedRow).removeClass('warning');
                    view.$('.selectedRowHeader').prop("checked", false);
                }
            });
            if (this.$el.find('.selectedRow').length === this.$el.find('.selectedRow:checked').length) {
                view.$('.selectedRowHeader').prop("checked", true);
            }
            if (this.$el.find('.selectedRow:checked').length > 1) {
                this.$el.find('.delAtOnces').css('visibility', 'visible');
            } else {
                this.$el.find('.delAtOnces').css('visibility', 'hidden');
            }
        },

        selectedRowHeader: function(e) {
            e.stopPropagation();
            var view = this;

            this.$($(e.target).closest('input[type="checkbox"]')).prop('checked', function() {
                if (this.checked) {
                    view.$('.userslist tbody tr').addClass('warning');
                    view.$(this).prop("checked", true);
                    view.$('.selectedRow').prop("checked", true);
                    view.$el.find('.delAtOnces').css('visibility', 'visible');
                } else {
                    view.$('.userslist tbody tr').removeClass('warning');
                    view.$(this).prop("checked", false);
                    view.$('.selectedRow').prop("checked", false);
                    view.$el.find('.delAtOnces').css('visibility', 'hidden');
                }
            });
        },

        addNewUser: function() {
            Events.trigger("view:navigate", {
                path: "usersDetail",
                options: {
                    trigger: true
                }
            });
        }
    });

    return UsersListView;
});