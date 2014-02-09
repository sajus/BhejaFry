define(function(require) {
    'use strict';

    var Backbone = require('backbone');

    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if (this.get('id') !== null) {
                return '/recruiter/' + this.get('id');
            } else {
                return '/recruiter';
            }
        },

        validation: {
            empid: [{
                required: true,
                msg: 'Enter recruiter\'s employee id.'
            }, {
                pattern: /^(([0-9]+)(^\s[0-9]+)?)$/gm,
                msg: 'The recruiter\'s employee id you specified is incorrect.'
            }],

            firstname: [{
                required: true,
                msg: 'Enter recruiter\'s first name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The recruiter\'s first name needs to be between 2 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The recruiter\'s first name you specified is incorrect.'
            }],

            lastname: [{
                required: true,
                msg: 'Enter recruiter\'s last name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The recruiter\'s last name needs to be between 2 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The recruiter\'s last name you specified is incorrect.'
            }]
        }
    });
});