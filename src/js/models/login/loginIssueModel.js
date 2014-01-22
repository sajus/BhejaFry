define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return '/checkEmailAuth';
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
            loginIssueOpt: {
                required: true,
                msg: 'Specify either you want to reset or unlock.'
            }
        }
    });
});