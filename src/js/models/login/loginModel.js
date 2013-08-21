// define(['backbone', 'modelValidator'], function(Backbone) {
define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/checkAuthorization';
        },

        validation: {
            email: {
                required: true,
                pattern: 'email'
            },
            password: [{
                required: true
            }, {
                pattern: '^[a-z0-9_-]{3,15}$',
                msg: 'Password should contain min 3 and max 15 characters.'
            }]
        }
    });
});