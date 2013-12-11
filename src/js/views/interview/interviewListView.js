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
            'click .delInterview': 'deleteInterview',
            'mouseover .interviews tbody tr': 'showRowElements',
            'mouseleave .interviews tbody tr': 'hideRowElements',
            'click .selectedRow': 'selectedRow',
            'click .selectedRowHeader': 'selectedRowHeader'
        },

        fetchInterviewList: function() {
            return this.interviewListCollection.fetch();
        },

        domElementsSetup: function() {
            $('.viewTitle').html('<h1>Interviews List</h1>');

            $(".refresh").tooltip({
                title: 'Refresh',
                animation: true,
                placement: 'top'
            });

            this.$el.find(".delAtOnces").tooltip({
                title: 'Remove one or multiple interviews',
                animation: true,
                placement: 'top'
            });
        },

        render: function() {
            var view = this;
            $.when(this.fetchInterviewList())
                .done(function(data) {
                    view.$el.html(interviewListTemplate({
                        interviews: data
                    }));
                    view.$el.find('.interviews').dataTable({
                        "bProcessing": true,
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
                        }, {
                            "asSorting": ["asc", "dec"],
                            "aTargets": [1]
                        }],
                        "bLengthChange": false
                    });
                    view.$el.find('#dataTable_filter :input').addClass('form-control').prop('placeholder', 'Search all columns').focus();
                })
                .fail(function(error) {
                    console.log('Error: ' + error);
                });

            this.domElementsSetup();

            return this;
        },

        editInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();
            Events.trigger("view:navigate", {
                path: "interview/" + this.$(e.target).closest('tr').attr('data-id'),
                options: {
                    trigger: true
                }
            });
        },

        deleteInterview: function(e) {
            e.preventDefault();
            e.stopPropagation();

            var confirmDelModal = new ConfirmDelModal();
            $('.modal-container').html(confirmDelModal.render(this.$(e.target).closest('tr').attr('data-id')).el);
            $('.modal-container .modal').modal('show');
        },

        showRowElements: function(e) {
            this.$(e.target).closest('tr').find('.delInterview').css('visibility', 'visible');
        },

        hideRowElements: function(e) {
            this.$(e.target).closest('tr').find('.delInterview').css('visibility', 'hidden');
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
                    view.$('.interviews tbody tr').addClass('warning');
                    view.$(this).prop("checked", true);
                    view.$('.selectedRow').prop("checked", true);
                    view.$el.find('.delAtOnces').css('visibility', 'visible');
                } else {
                    view.$('.interviews tbody tr').removeClass('warning');
                    view.$(this).prop("checked", false);
                    view.$('.selectedRow').prop("checked", false);
                    view.$el.find('.delAtOnces').css('visibility', 'hidden');
                }
            });
        }
    });
});