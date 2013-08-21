define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    return Backbone.Model.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/recruiter';
        }
    });
});