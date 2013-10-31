define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    require('modelValidator');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/checkEmailAuth';
        },

        validation: {
            email: {
                required: true,
                pattern: 'email'
            }
        }
    });
});