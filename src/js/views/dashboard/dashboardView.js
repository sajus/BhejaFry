define(function(require) {
	'use strict';

	var $ = require('jquery'),
		_ = require('underscore'),
		Backbone = require('backbone'),
		Core = require('core'),
		dashboardTemplate = require('template!templates/dashboard/dashboard');

	require('https://www.google.com/jsapi');
	require('chosen');

	var defaultView = "Status";
	var DashboardView = Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.interviewer_list = {};
			this.interviewer = [];
			var view = this;
			_.each(Core.globals.interviewer_list, function(data) {
				view.interviewer_list = _.object([
					"empid",
					"firstname",
					"lastname"
				], [
					data.empid,
					data.firstname,
					data.lastname
				]);
				view.interviewer.push(view.interviewer_list);
			});
			if ($.cookie('isAuthenticated')) {
				this.accesstype = $.cookie('accesstype');
			}
			this.render();
		},

		events: {
			'click .selectType': 'selectTypeEvent',
			'change .interviewerList': 'getReportByID'
		},

		getReportByID: function() {
			var empId = this.$el.find("select.interviewerList option:selected").val();
			if (empId === 0) {
				this.$el.find("#piechartEmp").hide();
				this.$el.find(".piechartEmpLog").hide();
				return;
			}
			var empText = this.$el.find("select.interviewerList option:selected").text();
			var chartEmp = new google.visualization.PieChart(document.getElementById('piechartEmp'));
			var view = this;
			var options = {
				title: 'Interviewer ' + defaultView + ' : Name - ' + empText,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};

			$.get('/interviewer' + defaultView + 'Report/' + empId)
				.success(function(data) {
					view.$el.find("#piechartEmp").hide();
					view.$el.find(".piechartEmpLog").hide();
					if (typeof(data.data) == "string") {
						view.$el.find(".piechartEmpLog").text(data.data);
						view.$el.find(".piechartEmpLog").show();
					} else {
						view.$el.find("#piechartEmp").show();
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
			this.$el.find('.interviewerList').chosen({allow_single_deselect: true});
			return this;
		},

		drawChart: function() {
			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
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