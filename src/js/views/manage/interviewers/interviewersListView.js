define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        interviewersListTemplate = require('template!templates/manage/interviewers/interviewersList'),
        InterviewerCollection = require('collections/interviewers/interviewersCollection'),
        ConfirmDelModal = require('views/interview/listDelConfirmModal'),
        DeleteInterviewersModel = require('models/manage/interviewers/interviewersListDetailModel');

    require('css!vendors/jquery/plugins/datatables/css/jquery.dataTables.css');
    require('css!vendors/jquery/plugins/datatables/css/dataTables_themeroller.css');
    require('css!vendors/jquery/plugins/datatables/css/smoothness/jquery-ui-1.8.4.custom.css');
    require('dataTables');

    return Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.deleteInterviewersModel = new DeleteInterviewersModel();
            this.interviewerCollection = new InterviewerCollection();
            this.render();
        },

        events: {
            'click .editInterviewer': 'editInterviewers',
            'click .delete': 'deleteInterviewers'
        },

        fetchInterviewersList: function() {
            return this.interviewerCollection.fetch();
        },

        render: function() {
            var view = this;
            $.when(this.fetchInterviewersList())
                .done(function(data) {
                    view.$el.html(interviewersListTemplate({
                        interviewers: data
                    }));
                    view.$el.find('.interviewers').dataTable({
                        "bJQueryUI": true,
                        "sPaginationType": "full_numbers",
                        "sScrollX": "100%",
                        "sScrollXInner": "110%",
                        "bScrollCollapse": true,
                        "language": {
                            "search": ""
                        },
                        "aoColumnDefs": [{
                            "bSortable": false,
                            "aTargets": [0, 3]
                        }],
                        "bLengthChange": false
                    });
                    view.$el.find('#dataTable_filter :input').addClass('form-control').prop('placeholder', 'Search all columns').focus();
                })
                .fail(function(error) {
                    console.log('Error: ' + error);
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
                        message: "Some error got triggered while deleting record."
                    }]);
                }
            });
        },

        editUser: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "mgnInterviewersDetail/" + this.$(e.target).closest('tr').attr('data-id'),
                options: {
                    trigger: true
                }
            });
        },

        deleteUser: function(e) {
            e.preventDefault();
            e.stopPropagation();
            var confirmDelModal = new ConfirmDelModal();
            $('.modal-container').html(confirmDelModal.render(this.$(e.target).closest('tr').attr('data-id')).el);
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
        }
    });
});