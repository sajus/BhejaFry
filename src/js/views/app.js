define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Core = require('core'),
        globals = require('globals'),
        Events = require('events'),
        alerts = require('utilities/alerts'),
        AlertView = require('views/alert');

    var AppView = Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.listenTo(Events, 'view:navigate', this.navigate);
            this.listenTo(Events, 'alert:success', this.alertSuccess);
            this.listenTo(Events, 'alert:error', this.alertError);
            this.listenTo(Events, 'alert:warning', this.alertWarning);
            this.listenTo(Events, 'alert:info', this.alertInfo);

            this.handleAjaxResponse();
            this.render();
        },

        handleAjaxResponse: function() {
            $.ajaxSetup({
                statusCode: {
                    401: function(response) {
                        Events.trigger('alert:error', [{
                            message: response.responseText
                        }]);
                        return false;
                    },
                    403: function(response) {
                        Events.trigger('alert:error', [{
                            message: response.responseText
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
            if (globals.getAuthUser().isAuthenticated) {
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