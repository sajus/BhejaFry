define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/authenticate';
        },

        validation: {
            email: [{
                required: true,
                msg: 'Enter your email address.'
            }, {
                pattern: 'email',
                msg: 'Email must be a valid Cybage email account.'
            }],
            password: [{
                required: true,
                msg: 'Enter your password.'
            }, {
                rangeLength: [8, 40],
                msg: 'Password should contain min 8 characters.'
            }]
        }
    });
});