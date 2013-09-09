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
            password: {
                required: true,
                msg: 'Password should contain min 8 characters.'
            } 
        }
    });
});