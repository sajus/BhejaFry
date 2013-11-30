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
			'click .minWindow, .maxWindow': 'dockWindow'
		},

		dockWindow: function(e) {
			if (this.$el.find(e.target).hasClass('minWindow')) {
				this.$el.find(e.target).removeClass('minWindow').addClass('maxWindow');
				this.$el.find(e.target).find('.fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
				this.$el.find(e.target).parent().parent().parent().find('div[class="panel-body"]').hide('slow');
			} else {
				this.$el.find(e.target).removeClass('maxWindow').addClass('minWindow');
				this.$el.find(e.target).find('.fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
				this.$el.find(e.target).parent().parent().parent().find('div[class="panel-body"]').show('slow');
			}
		},

		render: function() {

			this.$el.html(dashboardTemplate);
			this.setChartPreferences();

			this.turnOffCheck().done(function(data) {
				if (!data.appRelease) {
					var whatsNewModalView = new WhatsNewModalView();
					$('.modal-container').html(whatsNewModalView.render().el);
					$('.modal-container .modal').modal('show');
				}
			});

			$('.viewTitle').html('<h1>Dashboard</h1>');

			return this;
		},

		turnOffCheck: function() {
			var email = _.object([
				'email'
			], [
				$.cookie('email')
			]);
			return $.ajax({
				url: "/appRelease",
				type: "post",
				data: email,
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