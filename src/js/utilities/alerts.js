define(function(require) {
    'use strict';

    var AlertModel = require('models/alerts');

    var _render = function(alert) {
        var message = [{
            message: alert.messages
        }];

        if (alert.messages[0].message) {
            message = alert.messages;
        }

        var alertModel = new AlertModel({
            type: alert.type,
            messages: message
        });
        return alertModel;
    };

    return {
        'render': _render
    };

});