define(function(require) {
	'use strict';

	var $ = require('jquery'),
		Backbone = require('backbone'),
		dashboardTemplate = require('template!templates/dashboard/dashboard'),
		WhatsNewModalView = require('views/release/whatsNewModalView');

	require('css!vendors/jquery/plugins/chosen/chosen.min.css');
	require('chosen');
	require('bsTooltip');
	require('bsModal');
	require('highcharts');
	require('exportings');

	var DashboardView = Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.render();
		},

		events: {
			'click .togglePanel': 'togglePanel'
		},

		togglePanel: function(e) {
			this.$el.find(e.target).parent().parent().parent().find('div[class="panel-body"]').toggle('slow');
			this.$el.find(e.target).find('.fa-chevron-up').toggleClass('fa-chevron-down');
		},

		render: function() {
			this.$el.html(dashboardTemplate);
			this.setChartPreferences();
			this.uxFormation();

			return this;
		},

		uxFormation: function() {
			this.turnOffCheck().done(function(data) {
				if (!data.appRelease) {
					var whatsNewModalView = new WhatsNewModalView();
					$('.modal-container').html(whatsNewModalView.render().el);
					$('.modal-container .modal').modal('show');
				}
			});

			$('.breadcrumb').html("<li class='active'>Dashboard</li>");
		},

		turnOffCheck: function() {
			return $.ajax({
				url: "/appRelease",
				type: "post",
				data: {
					"email": $.cookie('email')
				},
				dataType: 'json'
			});
		},

		setChartPreferences: function() {
			var view = this;
			$.get('/reportStatus')
				.success(function(seriesData) {
					view.renderPieChart('overallAsPerStatus', 'Shows overall interview conducted status, grouped by a interviewed status', seriesData);
				});
			$.get('/reportMode')
				.success(function(seriesData) {
					view.renderPieChart('overallAsPerMode', 'Shows overall interview conducted status, grouped by a interviewed mode', seriesData);
				});
			$.get('/reportRounds')
				.success(function(seriesData) {
					view.renderPieChart('overallAsPerRounds', 'Shows overall interview conducted status, grouped by a interviewed rounds', seriesData);
				});
		},

		/***
		 * @params: id, titleText, seriesData
		 */
		renderPieChart: function(id, titleText, seriesData) {
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

	return DashboardView;
});