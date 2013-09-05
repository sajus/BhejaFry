define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    interviewersListDetailTemplate = require('template!templates/manage/interviewers/interviewersListDetail');

    var InterviewersListDetailView = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(interviewersListDetailTemplate);
        }
    });
    
    return InterviewersListDetailView;
});
