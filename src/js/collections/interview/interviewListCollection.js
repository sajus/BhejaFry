define(['backbone'], function(Backbone) {
	'use strict';

	return Backbone.Collection.extend({
		url: function() {
			return Backbone.Model.gateWayUrl + '/interviewList';
		}
	});
});