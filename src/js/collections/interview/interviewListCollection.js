define(['backbone', 'models/dashboard/dashboardModel'], function(Backbone, dashboardModel) {
	'use strict';

	return Backbone.Collection.extend({
		url: function() {
			return Backbone.Model.gateWayUrl + '/interviewList';
		}
	});
});