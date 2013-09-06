define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/interview';
        },

        validation: {
            candiateName: {
                required: true
            },
            description: {
            	required: true
            }
        }
    });
});