define(function(require) {
	'use strict';

	var Backbone = require('backbone');

	return Backbone.Collection.extend({
		url: function() {
			return '/interviewerStatusReport';
		}
	});
});