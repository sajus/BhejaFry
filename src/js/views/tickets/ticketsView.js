define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		ticketsTemplate = require('template!templates/tickets/tickets');

	require('bsTooltip');

	return Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(ticketsTemplate);
			this.uxFormation();

			return this;
		},

		uxFormation: function() {
			$('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Manage tickets</li>");
		}
	});
});