define(function(require) {

	'use strict';

	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Core = require('core'),
	dashboardTemplate = require('template!templates/dashboard/dashboard');

	require('https://www.google.com/jsapi');
	var defaultView = "Status";
	var DashboardView = Backbone.View.extend({

		el: '.page',

		initialize: function() {
			this.interviewer_list = {};
			this.interviewer = [];
			var self = this;
			_.each(Core.globals.interviewer_list, function(data) {
				self.interviewer_list = _.object([
						"empid",
						"firstname",
						"lastname"
					], [
						data.empid,
						data.firstname,
						data.lastname
					]);
				self.interviewer.push(self.interviewer_list);
			});
		},

		events: {
			'click .selectType': 'selectTypeEvent',
			'change .interviewerList':'getReportByID'
		},

		getReportByID:function(){
			var empId = this.$el.find("select.interviewerList option:selected").val();
			if(empId == 0){
				this.$el.find("#piechartEmp").hide();
				this.$el.find(".piechartEmpLog").hide();
				return; 
			} 
			var empText = this.$el.find("select.interviewerList option:selected").text();
			var chartEmp = new google.visualization.PieChart(document.getElementById('piechartEmp'));
			var self = this;
			var options = {
				title: 'Interviewer '+defaultView+' : Name - '+ empText,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};

			$.get('/interviewer'+defaultView+'Report/'+empId)
			.success(function(data) { 
				self.$el.find(".piechartEmp").hide(); 
				self.$el.find("#piechartEmpLog").hide(); 
				if(typeof(data.data)=="string"){
					self.$el.find(".piechartEmpLog").text(data.data);
					self.$el.find(".piechartEmpLog").show();
				}else{
					self.$el.find("#piechartEmp").show();
					chartEmp.draw(google.visualization.arrayToDataTable(data.data), options); 
				}
			}).fail(function() {
			});
		},
		
		selectTypeEvent:function(e){ 
			defaultView = e.currentTarget.id;
			this.drawChart();
			this.getReportByID()

		},

		render: function () {
			google.load('visualization', '1', {
				'callback': this.drawChart,
				'packages': ['corechart']
			});
			this.$el.html(dashboardTemplate({interviewerList:this.interviewer}));
			this.$el.find('input:radio[name=overallReport]').filter('[value=getStatusReport]').prop('checked', true);
		},

		drawChart: function() {
			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
			var options = {
				title: 'Interviews '+defaultView,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};
			$.get('/report'+defaultView)
			.success(function(data) {
				chart.draw(google.visualization.arrayToDataTable(data.data), options);
			}).fail(function() {
			});
		}
	})

	return DashboardView;
});
