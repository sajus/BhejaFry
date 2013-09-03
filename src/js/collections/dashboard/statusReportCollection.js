define(function(require) {
	'use strict';

    var Backbone = require('backbone');

    var DashboardCollection = Backbone.Collection.extend({
    	url: function() {
            return Backbone.Model.gateWayUrl + '/interviewerStatusReport';
        }
    });

    return DashboardCollection;
});
