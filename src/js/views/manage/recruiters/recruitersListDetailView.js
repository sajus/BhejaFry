define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    recruitersListDetailTemplate = require('template!templates/manage/recruiters/recruitersListDetail');

    var RecruitersListDetailView = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(recruitersListDetailTemplate);
        }
    });
    
    return RecruitersListDetailView;
});
