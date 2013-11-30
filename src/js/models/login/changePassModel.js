define(function(require) {

    'use strict';
    var $ = require('jquery'),
        Backbone = require('backbone');

    require('modelValidator');
    require('jqueryCookie');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/userChange/' + $.cookie('email');
        },

        validation: {
            currentPassword: {
                required: true,
                msg: 'Password should contain min 8 characters.'
            }
        }
    });
});