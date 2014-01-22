define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone');

    require('modelValidator');
    require('jqueryCookie');

    return Backbone.Model.extend({
        url: function() {
            return '/userChange/' + $.cookie('email');
        },

        validation: {
            currentPassword: [{
                required: true,
                msg: 'Enter your current password.'
            }, {
                rangeLength: [8, 40],
                msg: 'The current password should contain minimum 8 characters.'
            }],
            newPassword: [{
                required: true,
                msg: 'Enter your new password.'
            }, {
                rangeLength: [8, 40],
                msg: 'The new password should contain minimum 8 characters.'
            }],
        }
    });
});