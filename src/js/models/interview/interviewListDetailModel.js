define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if (this.get('email')) {
                return '/interviewList/' + this.get('email');
            } else {
                return '/interviewList';
            }
        },

        validation: {
            cFirstName: [{
                required: true,
                msg: 'Enter candidate\'s first name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The candidate\'s first name needs to be between 7 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The candidate\'s first name you specified is incorrect.'
            }],

            cLastName: [{
                required: true,
                msg: 'Enter candidate\'s last name.'
            }, {
                rangeLength: [2, 30],
                msg: 'The candidate\'s last name needs to be between 7 to 30 characters long.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'The candidate\'s last name you specified is incorrect.'
            }],

            cEmail: [{
                required: true,
                msg: 'Enter candidate\'s email address.'
            }, {
                rangeLength: [7, 40],
                msg: 'The candidate\'s email needs to be between 7 and 40 characters long.'
            }, {
                pattern: 'email',
                msg: 'The candidate\'s email you specified is incorrect.'
            }],

            interviewDate: {
                required: true,
                msg: 'Enter interviewed date.'
            },

            interviewers: {
                required: true,
                msg: 'Choose your interviewers.'
            },

            recruiters: {
                required: true,
                msg: 'Choose your recruiter.'
            },

            modes: {
                required: true,
                msg: 'Choose your mode.'
            },

            rounds: {
                required: true,
                msg: 'Choose your round.'
            },

            status: {
                required: true,
                msg: 'Choose your status.'
            },

            strength: [{
                required: false
            }, {
                rangeLength: [5, 1000],
                msg: 'The strength description needs to be between 5 and 1000 characters long.'
            }],

            improveArea: [{
                required: false
            }, {
                rangeLength: [5, 1000],
                msg: 'The improve area description needs to be between 5 and 1000 characters long.'
            }],

            comments: [{
                required: true,
                msg: 'Enter your comments.'
            }, {
                rangeLength: [5, 1000],
                msg: 'The comments description needs to be between 5 and 1000 characters long.'
            }]
        }
    });
});