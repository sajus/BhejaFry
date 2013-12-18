define(function(require) {
    'use strict';

    var Backbone = require('backbone');
    require('modelBinder');
    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            if (this.get('id')) {
                return Backbone.Model.gateWayUrl + '/interviewList/' + this.get('id');
            } else {
                return Backbone.Model.gateWayUrl + '/interviewList';
            }
        },

        validation: {
            cFirstName: [{
                required: false
            }, {
                minLength: 4,
                msg: 'First name should contain minimum 4 characters.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'First name you entered is incorrect.'
            }],

            cLastName: [{
                required: false
            }, {
                minLength: 4,
                msg: 'Last name should contain minimum 4 characters.'
            }, {
                pattern: /^(([A-Za-z]+)(^\s[A-Za-z]+)?)$/gm,
                msg: 'Last name you entered is incorrect.'
            }],

            cEmail: [{
                required: true,
                msg: 'Enter candidate\'s email address.'
            }, {
                pattern: 'email',
                msg: 'Email address you entered is incorrect.'
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
                msg: 'Choose your recruiters.'
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
                minLength: 4,
                msg: 'Strength should contain minimum 4 characters.'
            }],

            improveArea: [{
                required: false
            }, {
                minLength: 4,
                msg: 'Area of improvement should contain minimum 4 characters.'
            }],

            comments: [{
                required: true,
                msg: 'Enter your comments.'
            }, {
                minLength: 4,
                msg: 'Comments should contain minimum 4 characters.'
            }]
        }
    });
});