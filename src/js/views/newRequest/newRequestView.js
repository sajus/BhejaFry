define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		newRequestTemplate = require('template!templates/newRequest/newRequest');

	require('bsTooltip');

	return Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(newRequestTemplate);
			this.uxFormation();

			return this;
		},

		uxFormation: function() {
			$('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Manage New Request</li>");
		}
	});
});