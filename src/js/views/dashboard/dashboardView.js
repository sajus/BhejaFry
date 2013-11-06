define(function(require) {
	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Core = require('core'),
		dashboardTemplate = require('template!templates/dashboard/dashboard'),
		WhatsNewModalView = require('views/dashboard/whatsNewModalView');

	require('css!vendors/jquery/plugins/chosen/chosen.min.css');
	require('chosen');
	require('bsTooltip');
	require('bsModal');
	require('https://www.google.com/jsapi');

	var defaultView = 'Status';
	var DashboardView = Backbone.View.extend({

		el: '.page',

		initialize: function() {
			var view = this,
				interviewer_list = {};
			this.interviewer = [];

			_.each(Core.globals.interviewer_list, function(interviewer) {
				interviewer_list = _.object([
					'empid',
					'firstname',
					'lastname'
				], [
					interviewer.empid,
					interviewer.firstname,
					interviewer.lastname
				]);
				view.interviewer.push(interviewer_list);
			});
			if ($.cookie('isAuthenticated')) {
				this.accesstype = $.cookie('accesstype');
			}

			this.render();
		},

		events: {
			'click .selectType': 'selectTypeEvent',
			'change .interviewerList': 'getReportByID',
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

		getReportByID: function() {
			var empId = this.$el.find('select.interviewerList option:selected').val();
			if (empId === 0) {
				this.$el.find('#piechartEmp').hide();
				this.$el.find('#piechartEmpLog').hide();
				return;
			}
			var empText = this.$el.find('select.interviewerList option:selected').text();
			var chartEmp = new google.visualization.PieChart(document.getElementById('piechartEmp'));
			var view = this;
			var options = {
				title: 'Interviewer ' + defaultView + ' : Name - ' + empText,
				is3D: true,
				backgroundColor: '#f5f5f5',
				stroke: '#f6f6f6'
			};

			$.get('/interviewer' + defaultView + 'Report/' + empId)
				.success(function(data) {
					view.$el.find('#piechartEmp').hide();
					view.$el.find('#piechartEmpLog').hide();
					if (typeof(data.data) == 'string') {
						view.$el.find('#piechartEmpLog').text(data.data);
						view.$el.find('#piechartEmpLog').show();
					} else {
						view.$el.find('#piechartEmp').show();
						chartEmp.draw(google.visualization.arrayToDataTable(data.data), options);
					}
				}).fail(function() {});
		},

		selectTypeEvent: function(e) {
			defaultView = e.currentTarget.id;
			this.drawChart();
			this.getReportByID();
		},

		render: function() {
			google.load('visualization', '1', {
				'callback': this.drawChart,
				'packages': ['corechart']
			});
			if (this.accesstype === '1') {
				this.accesstype = true;
			} else {
				this.accesstype = false;
			}
			this.$el.html(dashboardTemplate({
				interviewerList: this.interviewer,
				type: this.accesstype
			}));

			this.$el.find('input:radio[name=overallReport]').filter('[value=getStatusReport]').prop('checked', true);
			this.$el.find('.interviewerList').chosen({
				allow_single_deselect: true
			});
			this.$el.find('.minWindow').tooltip({
				title: 'Provide control to minimize & maximize this panel window',
				animation: true,
				placement: 'left'
			});
			this.$el.find('.downloadChart').tooltip({
				title: 'Download this chart',
				animation: true,
				placement: 'left'
			});
			this.$el.find('.printChart').tooltip({
				title: 'Provide control to print the graph in this panel window',
				animation: true,
				placement: 'left'
			});

			var whatsNewModalView = new WhatsNewModalView();
			this.$('.modal-container').html(whatsNewModalView.render().el);
			this.$('.modal-container .modal').modal('show');
			this.$('.chosen-container-single').css('width', '55%');

			$('.viewTitle').html('<h1>Dashboard</h1>');

			return this;
		},

		drawChart: function() {
			var chart = new google.visualization.PieChart(document.getElementById('overallChartReport'));
			var options = {
				title: 'Interviews ' + defaultView,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};
			$.get('/report' + defaultView)
				.success(function(data) {
					chart.draw(google.visualization.arrayToDataTable(data.data), options);
				}).fail(function() {});
		}
	});

	return DashboardView;
});