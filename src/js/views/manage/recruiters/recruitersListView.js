define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Events = require('events'),
        recruitersListTemplate = require('template!templates/manage/recruiters/recruitersList'),
        RecruiterCollection = require('collections/recruiters/recruitersCollection'),
        ConfirmDelModal = require('views/manage/recruiters/recruiterDelConfirmModal');

    require('css!vendors/jquery/plugins/datatables/css/jquery.dataTables.css');
    require('css!vendors/jquery/plugins/datatables/css/dataTables_themeroller.css');
    require('css!vendors/jquery/plugins/datatables/css/smoothness/jquery-ui-1.8.4.custom.css');
    require('dataTables');

    return Backbone.View.extend({

        el: '.page',

        initialize: function() {
            this.recruitersCollection = new RecruiterCollection();
            this.render();
        },

        events: {
            'click .editRecruiter': 'editRecruiter',
            'click .delRecruiter, .delAtOnces': 'deleteRecruiter',
            'click .selectedRow': 'selectedRow',
            'click .selectedRowHeader': 'selectedRowHeader',
            'click .addNewRecruiter': 'addNewRecruiter'
        },

        fetchRecruitersList: function() {
            return this.recruitersCollection.fetch();
        },

        render: function() {
            var view = this;
            $.when(this.fetchRecruitersList())
                .done(function(data) {
                    view.$el.html(recruitersListTemplate({
                        recruiters: data
                    }));
                    view.$el.find('.recruiters').dataTable({
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

            this.uxFormation();

            return this;
        },

        uxFormation: function() {
            $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Recruiters List</li>");
        },

        editRecruiter: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "mgnRecruitersDetail/" + this.$(e.target).closest('tr').attr('data-id'),
                options: {
                    trigger: true
                }
            });
        },

        deleteRecruiter: function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.listenTo(Events, 'deletedRecruiter', this.render);
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
                    view.$('.recruiters tbody tr').addClass('warning');
                    view.$(this).prop("checked", true);
                    view.$('.selectedRow').prop("checked", true);
                    view.$el.find('.delAtOnces').css('visibility', 'visible');
                } else {
                    view.$('.recruiters tbody tr').removeClass('warning');
                    view.$(this).prop("checked", false);
                    view.$('.selectedRow').prop("checked", false);
                    view.$el.find('.delAtOnces').css('visibility', 'hidden');
                }
            });
        },

        addNewRecruiter: function() {
            Events.trigger("view:navigate", {
                path: "mgnRecruitersDetail",
                options: {
                    trigger: true
                }
            });
        }
    });
});