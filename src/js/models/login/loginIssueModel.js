define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/checkEmailAuth';
        },

        validation: {
            email: [{
                required: true,
                msg: 'Enter your email address.'
            }, {
                pattern: 'email',
                msg: 'The email you entered is incorrect.'
            }],
            loginIssueOpt: {
                required: true,
                msg: 'Specify either you want to reset or unlock.'
            }
        }
    });
});