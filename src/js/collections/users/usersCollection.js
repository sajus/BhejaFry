define(function(require) {

    'use strict';
    var Backbone = require('backbone');

    return Backbone.Collection.extend({
        url: function() {
            return Backbone.Model.gateWayUrl + '/users';
        }
    });
});