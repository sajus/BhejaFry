define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		activitiesTemplate = require('template!templates/activities/activities');

	require('bsTooltip');

	return Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(activitiesTemplate);
			this.uxFormation();

			return this;
		},

		uxFormation: function() {
			$('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Manage Activities</li>");
		}
	});
});