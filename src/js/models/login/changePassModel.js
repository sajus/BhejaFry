define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone');

    require('modelValidator');
    require('jqueryCookie');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/userChange/' + $.cookie('email');
        },

        validation: {
            currentPassword: [{
                required: true,
                msg: 'Enter your current password.'
            }, {
                rangeLength: [8, 40],
                msg: 'Current password should contain min 8 characters.'
            }],
            newPassword: [{
                required: true,
                msg: 'Enter your new password.'
            }, {
                rangeLength: [8, 40],
                msg: 'New password should contain min 8 characters.'
            }],
        }
    });
});