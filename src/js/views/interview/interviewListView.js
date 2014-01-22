define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        interviewListTemplate = require('template!templates/interview/interviewList'),
        InterviewListCollection = require('collections/interview/interviewListCollection'),
        ConfirmDelModal = require('views/interview/listDelConfirmModal'),
        Events = require('events');

    require('css!vendors/jquery/plugins/datatables/css/jquery.dataTables.css');
    require('css!vendors/jquery/plugins/datatables/css/dataTables_themeroller.css');
    require('css!vendors/jquery/plugins/datatables/css/smoothness/jquery-ui-1.8.4.custom.css');
    require('jqueryCookie');
    require('dataTables');
    require('bsTooltip');

    return Backbone.View.extend({

        initialize: function() {
            this.interviewListCollection = new InterviewListCollection();
            this.render();
        },

        el: '.page',

        events: {
            'click .editInterview': 'editInterview',
            'click .delInterview, .delAtOnces': 'deleteInterview',
            'click .selectedRow': 'selectedRow',
            'click .selectedRowHeader': 'selectedRowHeader',
            'click .addNewInterviews': 'addNewInterviews'
        },

        fetchInterviewList: function() {
            return this.interviewListCollection.fetch();
        },

        render: function() {
            var view = this;
            $.when(this.fetchInterviewList())
                .done(function(data) {
                    view.$el.html(interviewListTemplate({
                        interviews: data
                    }));
                    view.$el.find('.interviews').dataTable({
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
                            "aTargets": [0, 6]
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
            $('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Interview List</li>");

            this.$el.find(".delAtOnces").tooltip({
                title: 'Remove one or multiple interviews',
                animation: true,
                placement: 'top'
            });
        },

        editInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "interview/" + this.$(e.target).closest('tr').attr('data-email'),
                options: {
                    trigger: true
                }
            });
        },

        addNewInterviews: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "interview",
                options: {
                    trigger: true
                }
            });
        },

        deleteInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();

            this.listenTo(Events, 'deletedInterview', this.render);
            var confirmDelModal = new ConfirmDelModal();

            var targetDelete = {};
            var ids = [];

            targetDelete['ids'] = ids.push(this.$(e.target).closest('tr').attr('data-id'));

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
                    view.$('.interviews tbody tr.canSelect').addClass('warning');
                    view.$(this).prop("checked", true);
                    view.$('.selectedRow').prop("checked", true);

                    if (view.$el.find('.selectedRow').length !== 0) {
                        view.$el.find('.delAtOnces').css('visibility', 'visible');
                    }

                } else {
                    view.$('.interviews tbody tr.canSelect').removeClass('warning');
                    view.$(this).prop("checked", false);
                    view.$('.selectedRow').prop("checked", false);
                    view.$el.find('.delAtOnces').css('visibility', 'hidden');
                }
            });
        }
    });
});
