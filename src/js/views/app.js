define(function(require) {
    'use strict';

    var $ = require('jquery'),
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
            Events.on('alert:warning', this.alertWarning, this);
            Events.on('alert:info', this.alertInfo, this);
            this.handleAjaxResponse();
            this.render();
        },

        handleAjaxResponse: function() {
            $.ajaxSetup({
                statusCode: {
                    403: function(response) {
                        Events.trigger('alert:error', [{
                            message: response.statusText
                        }]);
                        return false;
                    }
                }
            });
        },

        navigate: function(navigationData) {
            Events.trigger('page:navigate', navigationData);
        },

        alertSuccess: function(message) {
            this.alert(alerts.render({
                type: 'success',
                messages: message
            }));
        },

        alertError: function(message) {
            this.alert(alerts.render({
                type: 'error',
                messages: message
            }));
        },

        alertWarning: function(message) {
            this.alert(alerts.render({
                type: 'warning',
                messages: message
            }));
        },

        alertInfo: function(message) {
            this.alert(alerts.render({
                type: 'info',
                messages: message
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