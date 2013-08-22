define(function(require) {

    'use strict';
    var Backbone = require('backbone');
    var _ = require('underscore');
    require('modelValidator');

    return Backbone.Model.extend({
    	url: function() {
            return Backbone.Model.gateWayUrl + '/interviewList/' + this.get('id');
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