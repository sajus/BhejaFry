define(function(require) {

	'use strict';

	var $ = require('jquery'),
	_ = require('underscore'),
	Backbone = require('backbone'),
	Core = require('core'),
	dashboardTemplate = require('template!templates/dashboard/dashboard');

	require('https://www.google.com/jsapi');

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

		getReportByID:function(e){
			var empId = this.$el.find("select.interviewerList option:selected").val();
			if(empId == 0){
				this.$el.find("#piechartEmpStatus").hide();
				this.$el.find("#piechartEmpMode").hide(); 
				this.$el.find(".piechartEmpStatusLog").hide();
				this.$el.find(".piechartEmpModeLog").hide(); 
				return; 
			} 
			var empText = this.$el.find("select.interviewerList option:selected").text();
			var chartEmpStatus = new google.visualization.PieChart(document.getElementById('piechartEmpStatus'));
			var chartEmpMode = new google.visualization.PieChart(document.getElementById('piechartEmpMode'));
			var self = this;
			var options = {
				title: 'Interviewer Name: '+ empText,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};

			$.get('/interviewerStatusReport/'+empId)
			.success(function(data) { 
				self.$el.find(".piechartEmpStatusLog").hide(); 
				self.$el.find("#piechartEmpStatus").hide(); 
				if(typeof(data.data)=="string"){
					self.$el.find(".piechartEmpStatusLog").text(data.data);
					self.$el.find(".piechartEmpStatusLog").show();
				}else{
					self.$el.find("#piechartEmpStatus").show();
					chartEmpStatus.draw(google.visualization.arrayToDataTable(data.data), options); 
				}
			}).fail(function() {
			});

			$.get('/interviewerModeReport/'+empId)
			.success(function(data) { 
				self.$el.find(".piechartEmpModeLog").hide(); 
				self.$el.find("#piechartEmpMode").hide(); 
				
				if(typeof(data.data)=="string"){
				   self.$el.find(".piechartEmpModeLog").text(data.data); 
				   self.$el.find(".piechartEmpModeLog").show();
				}else{
					self.$el.find("#piechartEmpMode").show();
					chartEmpMode.draw(google.visualization.arrayToDataTable(data.data), options);
				}
			}).fail(function() {
			});
		},
		
		selectTypeEvent:function(e){ 
			this.drawChart(e.currentTarget.id);
		},

		render: function () {
			google.load('visualization', '1', {
				'callback': this.drawChart,
				'packages': ['corechart']
			});
			this.$el.html(dashboardTemplate({interviewerList:this.interviewer}));
			this.$el.find('input:radio[name=overallReport]').filter('[value=getStatusReport]').prop('checked', true);
		},

		drawChart: function(_name) {
			if(!_name) _name = "Status"; //DEFAULT VALUE IF THERE IS NO NAME;
			var chart = new google.visualization.PieChart(document.getElementById('piechart'));
			var options = {
				title: 'Interviews '+_name,
				is3D: true,
				backgroundColor: '#EEE',
				stroke: '#FAFAFA'
			};
			$.get('/report'+_name)
			.success(function(data) {
				chart.draw(google.visualization.arrayToDataTable(data.data), options);
			}).fail(function() {
			});
		}
	})

	return DashboardView;
});
