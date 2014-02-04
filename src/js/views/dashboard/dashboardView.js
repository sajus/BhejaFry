define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		globals = require('globals'),
		dashboardTemplate = require('template!templates/dashboard/dashboard'),
		WhatsNewModalView = require('views/release/whatsNewModalView');

	require('highcharts');
	require('noDateInChart');
	require('exportings');
	require('bsTooltip');
	require('bsModal');

	return Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		events: {
			'click .togglePanel': 'togglePanel',
			'click [name=overallInterviewReport]': 'groupPieChartBy'
		},

		togglePanel: function(e) {
			this.$el.find(e.target).parent().parent().parent().find('div[class="panel-body"]').toggle('slow');
			this.$el.find(e.target).find('.fa-chevron-up').toggleClass('fa-chevron-down');
		},

		render: function() {
			this.$el.html(dashboardTemplate);

			this.groupPieChartBy();
			this.uxFormation();
			return this;
		},

		uxFormation: function() {
			$('.breadcrumb').html("<li class='active'>Dashboard</li>");

			this.turnOffCheck().done(function(data) {
				if (!data.appRelease) {
					var whatsNewModalView = new WhatsNewModalView();
					$('.modal-container').html(whatsNewModalView.render().el);
					$('.modal-container .modal').modal('show');
				}
			});
		},

		turnOffCheck: function() {
			return $.ajax({
				url: "/appRelease",
				type: "post",
				data: {
					"email": globals.getAuthUser().email
				},
				dataType: 'json'
			});
		},

		groupPieChartBy: function() {
			var view = this;
			switch (this.$el.find('input[name=overallInterviewReport]:radio:checked').val()) {
				case 'status':
					view.getSeriesData('reportStatus', 'status');
					break;

				case 'mode':
					view.getSeriesData('reportMode', 'mode');
					break;

				case 'round':
					view.getSeriesData('reportRounds', 'round');
					break;
			}
		},

		getSeriesData: function(url, groupBy) {
			var view = this;
			this.$el.find('#groupBy').html(groupBy);
			$.get('/' + url)
				.success(function(seriesData) {
					view.renderPieChart('overallInterviewReport', 'Shows overall interview conducted status, grouped by a interviewed ' + groupBy, seriesData);
				});
		},

		/***
		 * params: (id, titleText, seriesData)
		 */
		renderPieChart: function(id, titleText, seriesData) {
			if (seriesData.length === 0) {
				this.$el.find('#' + id).parent().next('.panel-footer').hide();
				this.$el.find('.highcharts-button').hide();
			}
			this.$el.find('#' + id).highcharts({
				chart: {
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				title: {
					text: titleText
				},
				tooltip: {
					pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: true,
							color: '#000000',
							connectorColor: '#000000',
							format: '<b>{point.name}</b>: {point.percentage:.1f} %'
						},
						showInLegend: true
					}
				},
				series: [{
					type: 'pie',
					name: 'Browser share',
					data: seriesData
				}]
			});
		}
	});
});