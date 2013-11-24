var sequelize = require('../dbconfig').sequelize,
	_ = require('../libresources').underscore;

/*
	GET THE INTERVIEW STATUS REPORT
*/
exports.getInterviewStatusReport = function(req, res) {
	var reportQuery = "SELECT COUNT(a.status_id) as statusCount, b.status FROM interviewresponse_tbl a, interviewstatus_tbl b WHERE a.status_id = b.id GROUP BY b.status";
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
	});
};

/*
	GET THE INTERVIEW MODE REPORT
*/
exports.getInterviewModeReport = function(req, res) {
	var status_1 = 0
	status_2 = 0
	status_3 = 0
	data = {};
	var query = "SELECT COUNT(mode_id) FROM interviewresponse_tbl Where deleteFlag=0 AND mode_id=";
	sequelize.query(query + "1").success(function(data) {
		status_1 = data[0]['COUNT(mode_id)']
		sequelize.query(query + "2").success(function(data) {
			status_2 = data[0]['COUNT(mode_id)'];
			sequelize.query(query + "3").success(function(data) {
				status_3 = data[0]['COUNT(mode_id)'];
				data = {
					data: [
						['Interviews Mode', 'Number'],
						['Telephonic', status_1],
						['VC/Skype', status_2],
						['Personal', status_3]
					]
				};
				res.format({
					json: function() {
						res.send(data);
					}
				});
			});
		});
	});
};

/*
	GET THE INTERVIEWER REPORT FOR STATUS
*/
exports.getInterviewerStatusReport = function(req, res) {
	var query = "SELECT status_id FROM interviewresponse_tbl ";
	query += "Where (interviewer_1_id=" + req.params.id + " OR "
	query += "interviewer_2_id=" + req.params.id + ") AND deleteFlag=0 AND "
	query += "status_id=";
	sequelize.query(query + "1").success(function(rows) {
		status_1 = rows.length;
		sequelize.query(query + "2").success(function(rows) {
			status_2 = rows.length;
			sequelize.query(query + "3").success(function(rows) {
				status_3 = rows.length;
				sequelize.query(query + "4").success(function(rows) {
					status_4 = rows.length;
					if (status_1 === 0 && status_2 === 0 && status_3 === 0 && status_4 === 0) {
						data = {
							data: 'There is no status record to Show'
						}
					} else {
						data = {
							data: [
								['Interviews Status', 'Number'],
								['Rejected', status_1],
								['Call for F2F round', status_2],
								['OnHold', status_3],
								['Selected', status_4]
							]
						};
					}
					res.format({
						json: function() {
							res.send(data);
						}
					});
				});
			});
		});
	});
};

/*
	GET THE INTERVIEWER REPORT FOR MODE
*/
exports.getInterviewerModeReport = function(req, res) {
	var query = "SELECT status_id FROM interviewresponse_tbl ";
	query += "Where (interviewer_1_id=" + req.params.id + " OR "
	query += "interviewer_2_id=" + req.params.id + ") AND deleteFlag=0 AND "
	query += "mode_id=";
	console.log(query);
	sequelize.query(query + "1").success(function(rows) {
		status_1 = rows.length;
		sequelize.query(query + "2").success(function(rows) {
			status_2 = rows.length;
			sequelize.query(query + "3").success(function(rows) {
				status_3 = rows.length;
				if (status_1 === 0 && status_2 === 0 && status_3 === 0) {
					data = {
						data: 'There is no mode record to Show'
					}
				} else {
					data = {
						data: [
							['Interviews Mode', 'Number'],
							['Telephonic', status_1],
							['VC/Skype', status_2],
							['Personal', status_3]
						]
					};
				}
				res.format({
					json: function() {
						res.send(data);
					}
				});
			});
		});
	});
};