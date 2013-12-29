define(function() {
	'use strict';

	var component = {};

	var populateInterviewer = function() {
		var interviewers = [];
		fetchData('interviewer').done(function(interviewer_list) {
			_.each(interviewer_list, function(data) {
				interviewers.push(_.object([
					"empid",
					"firstname",
					"lastname"
				], [
					data.empid,
					data.firstname,
					data.lastname
				]));
			});
			component.interviewer_list = interviewers;
		});
	};

	var populateMode = function() {
		var interviewmode = [];
		fetchData('mode').done(function(interviewmode_list) {
			_.each(interviewmode_list, function(data) {
				interviewmode.push(_.object([
					"id",
					"mode"
				], [
					data.id,
					data.mode
				]));
			});
			component.interviewmode_list = interviewmode;
		});
	};

	var populateStatus = function() {
		var interviewstatus = [];
		fetchData('status').done(function(interviewstatus_list) {
			_.each(interviewstatus_list, function(data) {
				interviewstatus.push(_.object([
					"id",
					"status"
				], [
					data.id,
					data.status
				]));
			});
			component.interviewstatus_list = interviewstatus;
		});
	};

	var populateRounds = function() {
		var interviewrounds = [];
		fetchData('rounds').done(function(interviewrounds_list) {
			_.each(interviewrounds_list, function(data) {
				interviewrounds.push(_.object([
					"id",
					"round"
				], [
					data.id,
					data.round
				]));
			});
			component.interviewrounds_list = interviewrounds;
		});
	};

	var populateRecruiter = function() {
		var recruiter = [];
		fetchData('recruiter').done(function(recruiter_list) {
			_.each(recruiter_list, function(data) {
				recruiter.push(_.object([
					"empid",
					"firstname",
					"lastname"
				], [
					data.empid,
					data.firstname,
					data.lastname
				]));
			});
			component.recruiter_list = recruiter;
		});
	};

	var fetchData = function(service) {
		return $.ajax({
			url: Backbone.Model.gateWayUrl + '/' + service
		});
	};

	return {
		gateWayPort: 9000,
		component: component,
		fetchInterviewer: populateInterviewer,
		fetchMode: populateMode,
		fetchStatus: populateStatus,
		fetchRounds: populateRounds,
		fetchRecruiter: populateRecruiter
	};
});