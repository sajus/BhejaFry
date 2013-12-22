/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize
moment = require('../config/npmConfig').moment,
	_ = require('../config/npmConfig').underscore,
	sqlString = require('../config/npmConfig').sqlString;

/**
 * Request Method: GET
 * Description: Service is for getting the list of interview and candidate data.
 *
 ***/
exports.getInterviewList = function(req, res) {
	var joinQuery = "SELECT interviewresponse_tbl.id, interviewresponse_tbl.cFirstName, interviewresponse_tbl.cLastName, interviewresponse_tbl.cEmail, interviewresponse_tbl.interviewDate, interviewer_tbl1.firstname as ivofirstname, interviewer_tbl1.lastname as ivolastname, interviewer_tbl2.firstname as ivtfirstname, interviewer_tbl2.lastname as ivtlastname, recruiter_tbl.firstname as rcfirstname, recruiter_tbl.lastname as rclastname, interviewmode_tbl.mode, interviewstatus_tbl.id as statusid, interviewstatus_tbl.status, interviewrounds_tbl.round FROM interviewresponse_tbl LEFT JOIN interviewer_tbl as interviewer_tbl1 ON interviewresponse_tbl.interviewer_1_id = interviewer_tbl1.empid LEFT JOIN interviewer_tbl as interviewer_tbl2 ON interviewresponse_tbl.interviewer_2_id = interviewer_tbl2.empid LEFT JOIN recruiter_tbl ON interviewresponse_tbl.recruiter_id = recruiter_tbl.empid LEFT JOIN interviewmode_tbl ON interviewresponse_tbl.mode_id = interviewmode_tbl.id LEFT JOIN interviewstatus_tbl ON interviewresponse_tbl.status_id = interviewstatus_tbl.id LEFT JOIN interviewrounds_tbl ON interviewresponse_tbl.round_id = interviewrounds_tbl.id WHERE interviewresponse_tbl.recycleBin = 0";

	sequelize.query(joinQuery).success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: POST
 * Description: Service is for setting the interview and candidate details.
 *
 ***/
exports.postInterview = function(req, res) {
	var sql_isCEmailAlready = "SELECT cEmail FROM interviewresponse_tbl WHERE interviewresponse_tbl.recycleBin = 0 AND cEmail = " + sqlString.escape(req.body.cEmail) + " LIMIT 1";
	sequelize.query(sql_isCEmailAlready).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			var payload = req.body;
			var sql_insertInterview = "INSERT INTO interviewresponse_tbl (cFirstName, cLastName, cEmail, interviewer_1_id, interviewer_2_id, interviewDate ,recruiter_id, status_id, round_id, mode_id, strength, improveArea, comments, recycleBin)";
			sql_insertInterview += " VALUES (";
			sql_insertInterview += (payload.cFirstName === null) ? payload.cFirstName + " ," : sqlString.escape(payload.cFirstName) + " ,";
			sql_insertInterview += (payload.cLastName === null) ? payload.cLastName + " ," : sqlString.escape(payload.cLastName) + " ,";
			sql_insertInterview += sqlString.escape(payload.cEmail) + " ,";
			sql_insertInterview += sqlString.escape(payload.interviewer_1_id) + " ,";
			sql_insertInterview += (payload.interviewer_1_id !== payload.interviewer_2_id) ? sqlString.escape(payload.interviewer_2_id) + " ," : null + " ,";
			sql_insertInterview += sqlString.escape(payload.interviewDate) + " ,";
			sql_insertInterview += sqlString.escape(payload.recruiter_id) + " ,";
			sql_insertInterview += sqlString.escape(payload.status_id) + " ,";
			sql_insertInterview += sqlString.escape(payload.round_id) + " ,";
			sql_insertInterview += sqlString.escape(payload.mode_id) + " ,";
			sql_insertInterview += (payload.strength === null) ? payload.strength + " ," : sqlString.escape(payload.strength) + " ,";
			sql_insertInterview += (payload.improveArea === null) ? payload.improveArea + " ," : sqlString.escape(payload.improveArea) + " ,";
			sql_insertInterview += sqlString.escape(payload.comments) + " ,";
			sql_insertInterview += 0 + " )";

			var sql_selectInterview = "SELECT * FROM interviewresponse_tbl WHERE interviewresponse_tbl.recycleBin = 0 ORDER BY id DESC LIMIT 1";

			sequelize.query(sql_insertInterview).success(function() {
				sequelize.query(sql_selectInterview).success(function(rows) {
					res.format({
						json: function() {
							res.send(rows);
						}
					});
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});
		} else {
			// The candidate email is already exist and is not in recycleBin.
			res.status(500).send('Candidate email already exist.');
		}
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: GET
 * Description: Service is for getting interview and candidate details.
 *
 ***/
exports.getInterviewListById = function(req, res) {
	sequelize.query("SELECT * FROM interviewresponse_tbl WHERE id=" + req.params.id + " AND recycleBin=0 LIMIT 1").success(function(rows) {
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
			"comments"
		], [
			rows[0].id,
			rows[0].cFirstName,
			rows[0].cLastName,
			rows[0].cEmail,
			rows[0].interviewer_1_id,
			rows[0].interviewer_2_id,
			rows[0].interviewDate,
			rows[0].recruiter_id,
			rows[0].status_id,
			rows[0].round_id,
			rows[0].mode_id,
			rows[0].strength,
			rows[0].improveArea,
			rows[0].comments
		]);
		res.format({
			json: function() {
				res.send(userDetails);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: PUT
 * Description: Service is for updating interview and candidate details.
 *
 ***/
exports.putInterviewListById = function(req, res) {
	var payload = req.body;

	var updateQuery = "UPDATE interviewresponse_tbl SET";

	updateQuery += (payload.cFirstName === null) ? " cFirstName = " + payload.cFirstName + " , " + " ," : " cFirstName = " + sqlString.escape(payload.cFirstName) + " , ";
	updateQuery += (payload.cLastName === null) ? " cLastName = " + payload.cLastName + " , " : " cLastName = " + sqlString.escape(payload.cLastName) + " , ";

	updateQuery += " cEmail = " + sqlString.escape(payload.cEmail) + " , ";
	updateQuery += " interviewer_1_id = " + sqlString.escape(payload.interviewer_1_id) + " , ";

	updateQuery += (payload.interviewer_1_id !== payload.interviewer_2_id) ? " interviewer_2_id = " + sqlString.escape(payload.interviewer_2_id) + " , " : " interviewer_2_id = " + null + " ,";

	updateQuery += " interviewDate = " + sqlString.escape(payload.interviewDate) + " , ";
	updateQuery += " recruiter_id = " + sqlString.escape(payload.recruiter_id) + " , ";
	updateQuery += " status_id = " + sqlString.escape(payload.status_id) + " , ";
	updateQuery += " round_id = " + sqlString.escape(payload.round_id) + " , ";
	updateQuery += " mode_id = " + sqlString.escape(payload.mode_id) + " , ";

	updateQuery += (payload.cLastName === null) ? " strength = " + payload.strength + " , " : " strength = " + sqlString.escape(payload.strength) + " , ";
	updateQuery += (payload.cLastName === null) ? " improveArea = " + payload.improveArea + " , " : " improveArea = " + sqlString.escape(payload.improveArea) + " , ";

	updateQuery += " comments = " + sqlString.escape(payload.comments);
	updateQuery += " WHERE id = " + req.params.id;

	sequelize.query(updateQuery).success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error)
	});
};

/**
 * Request Method: DELETE
 * Description:  Service is for updating delete flag for interview datails.
 *
 ***/
exports.delInterviewListById = function(req, res) {
	var query = "UPDATE interviewresponse_tbl SET";
	query += " " + "recycleBin = 1 WHERE id =" + req.params.id + ";"

	sequelize.query(query).success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error)
	});
};