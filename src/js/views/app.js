define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Core = require('core'),
        Events = require('events'),
        alerts = require('utilities/alerts'),
        AlertView = require('views/alert');

    require('jqueryCookie');

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            Events.on('view:navigate', this.navigate, this);
            Events.on('alert:success', this.alertSuccess, this);
            Events.on('alert:error', this.alertError, this);
            this.render();
        },

        navigate: function(navigationData) {
            Events.trigger('page:navigate', navigationData);
        },

        alertSuccess: function(messages) {
            this.alert(alerts.render({
                type: 'success',
                messages: messages
            }));
        },

        alertError: function(messages) {
            this.alert(alerts.render({
                type: 'error',
                messages: messages
            }));
        },

        alert: function(alertModel) {
            if ($(".modal").size() !== 0) {
                this.alertView = new AlertView({
                    el: '.modal .alert-container'
                });
            } else {
                this.alertView = new AlertView({
                    el: '.alert-container'
                });
            }
            this.alertView.model = alertModel;
            this.alertView.render();
        },

        render: function() {
            if ($.cookie('isAuthenticated')) {
                require(['views/master/layout/layoutView'], function(LayoutView) {
                    Core.create(this, 'LayoutView', LayoutView, {
                        skipAuthCheck: true
                    });
                });
            }
        }
    });

    return AppView;
});