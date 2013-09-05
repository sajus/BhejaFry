define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    usersListTemplate = require('template!templates/users/usersDetail');

    var UsersListView = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(usersListTemplate);
        }
    });
    
    return UsersListView;
});
