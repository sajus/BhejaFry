define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return '/authenticate';
        },

        validation: {
            email: [{
                required: true,
                msg: 'Enter your email address.'
            }, {
                pattern: 'email',
                msg: 'The email you entered is incorrect.'
            }, {
                rangeLength: [7, 40],
                msg: 'The email needs to be between 7 to 40 characters long.'
            }],
            password: [{
                required: true,
                msg: 'Enter your password.'
            }, {
                rangeLength: [8, 80],
                msg: 'The password should contain minimum 8 characters long.'
            }]
        }
    });
});