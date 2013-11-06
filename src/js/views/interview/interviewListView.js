define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        interviewListTemplate = require('template!templates/interview/interviewList'),
        DeleteInterviewModel = require('models/interview/interviewListDetailModel'),
        InterviewListCollection = require('collections/interview/interviewListCollection'),
        ConfirmDelModal = require('views/interview/listDelConfirmModal'),
        Events = require('events'),
        Core = require('core');

    require('css!vendors/jquery/plugins/datatables/css/jquery.dataTables.css');
    require('jqueryCookie');
    require('DT_bootstrap');

    return Backbone.View.extend({

        initialize: function() {
            this.interviewListCollection = new InterviewListCollection();
            this.render();
        },

        el: '.page',

        events: {
            'click .editInterview': 'editInterview',
            'click .delInterview': 'deleteInterview'
        },

        fetchInterviewList: function() {
            return this.interviewListCollection.fetch();
        },

        domElementsSetup: function() {
            $('.viewTitle').html('<h1>Interviews List</h1>');
        },

        render: function() {
            var view = this;
            $.when(this.fetchInterviewList())
                .done(function(data) {
                    view.$el.html(interviewListTemplate({
                        interviews: data
                    }));
                    view.$el.find('.interviews').dataTable({});
                    view.$el.find('#dataTable_filter :input').addClass('form-control').prop('placeholder', 'Search');
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
            this.$('.modal-container').html(confirmDelModal.render(this.$(e.target).closest('tr').attr('data-id')).el);
            this.$('.modal-container .modal').modal('show');
        }

    });
});