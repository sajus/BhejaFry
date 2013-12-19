/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: GET
 * Description: Service is for sending response with overall candidate report as per interview status.
 *
 ***/
exports.getInterviewStatusReport = function(req, res) {
	var reportQuery = "SELECT COUNT(a.status_id) as statusCount, b.status FROM interviewresponse_tbl a, interviewstatus_tbl b WHERE a.recycleBin=0 AND a.status_id = b.id GROUP BY b.status";
	sequelize.query(reportQuery).success(function(tblRes) {
		var srcRes = [];

		_.each(tblRes, function(data) {
			var setStatus = [];
			setStatus.push(data.status);
			setStatus.push(data.statusCount);
			srcRes.push(setStatus);
			setStatus = [];
		});

		res.format({
			json: function() {
				res.send(srcRes);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: GET
 * Description: Service is for sending response with overall candidate report as per interview mode.
 *
 ***/
exports.getInterviewModeReport = function(req, res) {
	var reportQuery = "SELECT COUNT(a.mode_id) as modeCount, b.mode FROM interviewresponse_tbl a, interviewmode_tbl b WHERE a.recycleBin=0 AND a.mode_id = b.id GROUP BY b.mode";
	sequelize.query(reportQuery).success(function(tblRes) {
		var srcRes = [];

		_.each(tblRes, function(data) {
			var setMode = [];
			setMode.push(data.mode);
			setMode.push(data.modeCount);
			srcRes.push(setMode);
			setMode = [];
		});

		res.format({
			json: function() {
				res.send(srcRes);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: GET
 * Description: Service is for sending response with overall candidate report as per interview rounds.
 *
 ***/
exports.getInterviewRoundReport = function(req, res) {
	var reportQuery = "SELECT COUNT(a.round_id) as roundCount, b.round FROM interviewresponse_tbl a, interviewrounds_tbl b WHERE a.recycleBin=0 AND a.round_id = b.id GROUP BY b.round";
	sequelize.query(reportQuery).success(function(tblRes) {
		var srcRes = [];

		_.each(tblRes, function(data) {
			var setRound = [];
			setRound.push(data.round);
			setRound.push(data.roundCount);
			srcRes.push(setRound);
			setRound = [];
		});

		res.format({
			json: function() {
				res.send(srcRes);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};