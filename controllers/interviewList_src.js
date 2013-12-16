var sequelize = require('../config/sqlzConfig').sequelize
moment = require('../config/npmConfig').moment,
	_ = require('../config/npmConfig').underscore;


exports.getInterviewList = function(req, res) {
	var joinQuery = "SELECT interviewresponse_tbl.id, interviewresponse_tbl.cFirstName, interviewresponse_tbl.cLastName, interviewresponse_tbl.cEmail, interviewresponse_tbl.interviewDate, interviewer_tbl1.firstname as ivofirstname, interviewer_tbl1.lastname as ivolastname, interviewer_tbl2.firstname as ivtfirstname, interviewer_tbl2.lastname as ivtlastname, recruiter_tbl.firstname as rcfirstname, recruiter_tbl.lastname as rclastname, interviewmode_tbl.mode, interviewstatus_tbl.id as statusid, interviewstatus_tbl.status, interviewrounds_tbl.round FROM interviewresponse_tbl LEFT JOIN interviewer_tbl as interviewer_tbl1 ON interviewresponse_tbl.interviewer_1_id = interviewer_tbl1.empid LEFT JOIN interviewer_tbl as interviewer_tbl2 ON interviewresponse_tbl.interviewer_2_id = interviewer_tbl2.empid LEFT JOIN recruiter_tbl ON interviewresponse_tbl.recruiter_id = recruiter_tbl.empid LEFT JOIN interviewmode_tbl ON interviewresponse_tbl.mode_id = interviewmode_tbl.id LEFT JOIN interviewstatus_tbl ON interviewresponse_tbl.status_id = interviewstatus_tbl.id LEFT JOIN interviewrounds_tbl ON interviewresponse_tbl.round_id = interviewrounds_tbl.id ";

	sequelize.query(joinQuery).success(function(rows) {
		res.format({
			json: function() {
				_.each(rows, function(row) {
					row.interviewDate = moment(row.interviewDate).format("DD-MMM-YYYY");
				})
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.postInterview = function(req, res) {
	var interviewer_2_id = null;
	req.body.interviewer_2_id === undefined ? interviewer_2_id = null : interviewer_2_id = req.body.interviewer_2_id;

	var query = "INSERT INTO interviewresponse_tbl (cFirstName, cLastName, cEmail, interviewer_1_id, interviewer_2_id, interviewDate ,recruiter_id, status_id, round_id, mode_id, strength, improveArea, comments, deleteFlag)";
	query += "VALUES (";
	query += " '" + req.body.candiateName + "',";
	query += req.body.interviewer_1_id + " ,";
	query += interviewer_2_id + " ,";
	query += " '" + req.body.interviewDate + "',";
	query += req.body.recruiter_id + " ,";
	query += req.body.status_id + " ,";
	query += req.body.round_id + " ,";
	query += req.body.mode_id + " ,";
	query += " '" + req.body.strength + "',";
	query += " '" + req.body.improveArea + "',";
	query += " '" + req.body.comments + "',";
	query += 0 + " )";

	var queryID = "SELECT * FROM interviewresponse_tbl WHERE deleteFlag=0 ORDER BY id DESC LIMIT 1;";

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		}).error(function(error) {
			console.log("Query Error: " + error);
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.getInterviewListById = function(req, res) {
	sequelize.query("SELECT * FROM interviewresponse_tbl WHERE id=" + req.params.id + " AND deleteFlag=0 LIMIT 1").success(function(rows) {
		var userDetails = _.object([
			"id",
			"cFirstName",
			"cLastName",
			"cEmail",
			"interviewer_1_id",
			"interviewer_2_id",
			"interviewDate",
			"recruiter_id",
			"status_id",
			"round_id",
			"mode_id",
			"strength",
			"improveArea",
			"comments",
			"deleteFlag"
		], [
			rows[0].id,
			rows[0].cFirstName,
			rows[0].cLastName,
			rows[0].cEmail,
			rows[0].interviewer_1_id,
			rows[0].interviewer_2_id,
			moment(rows[0].interviewDate).format('DD MMMM YYYY, dddd'),
			rows[0].recruiter_id,
			rows[0].status_id,
			rows[0].round_id,
			rows[0].mode_id,
			rows[0].strength,
			rows[0].improveArea,
			rows[0].comments,
			0
		]);
		res.format({
			json: function() {
				res.send(userDetails);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.putInterviewListById = function(req, res) {
	var query = "UPDATE interviewresponse_tbl SET";
	query += " " + "cFirstName = '" + req.body.cFirstName + "',";
	query += " " + "cLastName = '" + req.body.cLastName + "',";
	query += " " + "cEmailName = '" + req.body.cEmailName + "',";
	query += " " + "interviewer_1_id = " + req.body.interviewer_1_id + ",";
	query += " " + "interviewer_2_id = " + req.body.interviewer_2_id + ",";
	query += " " + "interviewDate = '" + moment(req.body.interviewDate).format("DD-MMM-YYYY") + "',";
	query += " " + "recruiter_id = " + req.body.recruiter_id + ",";
	query += " " + "status_id = " + req.body.status_id + ",";
	query += " " + "round_id = " + req.body.round_id + ",";
	query += " " + "mode_id = " + req.body.mode_id + ",";
	query += " " + "strength = '" + req.body.strength + "',";
	query += " " + "improveArea = '" + req.body.improveArea + "',";
	query += " " + "comments = '" + req.body.comments + "',";
	query += " " + "deleteFlag = " + req.body.deleteFlag + "";
	query += " WHERE id =" + req.params.id + ";";

	sequelize.query(query).success(function() {
		res.send(req.params);
	}).error(function(error) {});
};

exports.delInterviewListById = function(req, res) {
	var query = "UPDATE interviewresponse_tbl SET";
	query += " " + "deleteFlag = 1 WHERE id =" + req.params.id + ";"

	sequelize.query(query).success(function() {
		res.send(req.params);
	}).error(function(error) {});
};