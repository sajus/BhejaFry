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
            cFirstName: {
                required: false
            },
            cLastName: {
                required: false
            },
            cEmail: [{
                required: true,
                msg: 'Enter candidate\'s email address.'
            }, {
                pattern: 'email',
                msg: 'The candidate\'s email you entered is incorrect.'
            }],
            interviewDate: {
                required: true
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
            strength: {
                required: false
            },
            improveArea: {
                required: false
            },
            comments: [{
                required: true,
                msg: 'Enter your comments.'
            }, {
                minLength: 4,
                msg: 'Comments should contain min 4 characters.'
            }]
        }
    });
});