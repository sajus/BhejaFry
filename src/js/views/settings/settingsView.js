define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		settingsTemplate = require('template!templates/settings/settings');

	require('bsTooltip');

	return Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		render: function() {
			this.$el.html(settingsTemplate);
			this.uxFormation();

			return this;
		},

		uxFormation: function() {
			$('.breadcrumb').html("<li><a href='#'>Dashboard</a></li><li class='active'>Manage Preferences</li>");
		}
	});
});