define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if (this.get('email')) {
                return '/usersList/' + this.get('email');
            } else {
                return '/usersList';
            }
        },

        validation: {
            empid: [{
                required: true,
                msg: 'Enter user\'s employee id.'
            }, {
                pattern: /^(([0-9]+)(^\s[0-9]+)?)$/gm,
                msg: 'The user\'s employee id you specified is incorrect.'
            }],

            firstname: [{
                required: true,
                msg: 'Enter user\'s first name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The user\'s first name needs to be between 2 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The user\'s first name you specified is incorrect.'
            }],

            lastname: [{
                required: true,
                msg: 'Enter user\'s last name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The user\'s last name needs to be between 2 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The user\'s last name you specified is incorrect.'
            }],

            email: [{
                required: true,
                msg: 'Enter user\'s email address.'
            }, {
                rangeLength: [7, 40],
                msg: 'The user\'s email needs to be between 7 and 40 characters long.'
            }, {
                pattern: 'email',
                msg: 'The user\'s email you specified is incorrect.'
            }],

            role_id: {
                required: true,
                msg: 'Specify user role.'
            }
        }
    });
});