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
	var joinQuery = "SELECT interviewresponse_tbl.id, interviewresponse_tbl.cFirstName, interviewresponse_tbl.cLastName, interviewresponse_tbl.cEmail, interviewresponse_tbl.interviewDate, interviewer_tbl1.firstname as ivofirstname, interviewer_tbl1.lastname as ivolastname, interviewer_tbl2.firstname as ivtfirstname, interviewer_tbl2.lastname as ivtlastname, recruiter_tbl.firstname as rcfirstname, recruiter_tbl.lastname as rclastname, interviewmode_tbl.mode, interviewstatus_tbl.id as statusid, interviewstatus_tbl.status, interviewrounds_tbl.round FROM interviewresponse_tbl LEFT JOIN interviewer_tbl as interviewer_tbl1 ON interviewresponse_tbl.interviewer_1_id = interviewer_tbl1.empid LEFT JOIN interviewer_tbl as interviewer_tbl2 ON interviewresponse_tbl.interviewer_2_id = interviewer_tbl2.empid LEFT JOIN recruiter_tbl ON interviewresponse_tbl.recruiter_id = recruiter_tbl.empid LEFT JOIN interviewmode_tbl ON interviewresponse_tbl.mode_id = interviewmode_tbl.id LEFT JOIN interviewstatus_tbl ON interviewresponse_tbl.status_id = interviewstatus_tbl.id LEFT JOIN interviewrounds_tbl ON interviewresponse_tbl.round_id = interviewrounds_tbl.id WHERE recycleBin = 0";

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
	var payload = req.body;

	// var interviewer_2_id = () ? null console.log('T') : payload.interviewer_2_id console.log('F');
	// console.log("Google: " + interviewer_2_id);
	
	var insertQuery = "INSERT INTO interviewresponse_tbl (cFirstName, cLastName, cEmail, interviewer_1_id, interviewer_2_id, interviewDate ,recruiter_id, status_id, round_id, mode_id, strength, improveArea, comments, recycleBin)";
	insertQuery += "VALUES (";
	insertQuery += sqlString.escape(payload.cFirstName) + " ,";
	insertQuery += sqlString.escape(payload.cLastName) + " ,";
	insertQuery += sqlString.escape(payload.cEmail) + " ,";
	insertQuery += sqlString.escape(payload.interviewer_1_id) + " ,";

	if(payload.interviewer_1_id !== payload.interviewer_2_id) {
		insertQuery += sqlString.escape(payload.interviewer_2_id) + " ,";
	} else {
		insertQuery += null + " ,";
	}	
	
	insertQuery += sqlString.escape(payload.interviewDate) + " ,";
	insertQuery += sqlString.escape(payload.recruiter_id) + " ,";
	insertQuery += sqlString.escape(payload.status_id) + " ,";
	insertQuery += sqlString.escape(payload.round_id) + " ,";
	insertQuery += sqlString.escape(payload.mode_id) + " ,";
	insertQuery += sqlString.escape(payload.strength) + " ,";
	insertQuery += sqlString.escape(payload.improveArea) + " ,";
	insertQuery += sqlString.escape(payload.comments) + " ,";
	insertQuery += 0 + " )";

	var selectQuery = "SELECT * FROM interviewresponse_tbl WHERE recycleBin=0 ORDER BY id DESC LIMIT 1;";

	sequelize.query(insertQuery).success(function() {
		sequelize.query(selectQuery).success(function(rows) {
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
	if(payload.cFirstName===null) {
		updateQuery += " cFirstName = " + payload.cFirstName + " , ";
	} else {
		updateQuery += " cFirstName = " + sqlString.escape(payload.cFirstName) + " , ";
	}
	if(payload.cLastName===null) {
		updateQuery += " cLastName = " + payload.cLastName + " , ";
	} else {
		updateQuery += " cLastName = " + sqlString.escape(payload.cLastName) + " , ";
	}
	updateQuery += " cEmail = " + sqlString.escape(payload.cEmail) + " , ";
	updateQuery += " interviewer_1_id = " + sqlString.escape(payload.interviewer_1_id) + " , ";
	updateQuery += " interviewer_2_id = " + sqlString.escape(payload.interviewer_2_id) + " , ";
	updateQuery += " interviewDate = " + sqlString.escape(payload.interviewDate) + " , ";
	updateQuery += " recruiter_id = " + sqlString.escape(payload.recruiter_id) + " , ";
	updateQuery += " status_id = " + sqlString.escape(payload.status_id) + " , ";
	updateQuery += " round_id = " + sqlString.escape(payload.round_id) + " , ";
	updateQuery += " mode_id = " + sqlString.escape(payload.mode_id) + " , ";
	
	if(payload.strength===null) {
		updateQuery += " strength = " + payload.strength + " , ";
	} else {
		updateQuery += " strength = " + sqlString.escape(payload.strength) + " , ";
	}
	if(payload.improveArea===null) {
		updateQuery += " improveArea = " + payload.improveArea + " , ";
	} else {
		updateQuery += " improveArea = " + sqlString.escape(payload.improveArea) + " , ";
	}
	
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