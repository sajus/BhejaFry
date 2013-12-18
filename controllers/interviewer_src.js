var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/*
	GET THE LIST OF ALL INTERVIEWER
*/
exports.getInterviewer = function(req, res) {
	sequelize.query("SELECT * FROM  interviewer_tbl ORDER BY firstname").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log(error);
	});
};

/*
	GET THE DETAILS OF THE INTERVIEWER WITH EMP ID
*/
exports.getInterviewerById = function(req, res) {
	sequelize.query("SELECT * FROM  interviewer_tbl Where empid=" + req.params.id + " LIMIT 1").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows[0]);
			}
		});
	}).error(function(error) {
		console.log(error);
	});
}

/*
	ADD THE NEW RECRUITER WITH EMP ID
*/
exports.postInterviewer = function(req, res) {
	var query = "INSERT INTO interviewer_tbl (empid,firstname,lastname)";
	query += "VALUES (";
	query += req.body.empid + ",";
	query += " '" + req.body.firstname + "',";
	query += " '" + req.body.lastname + "' )";

	var queryID = "SELECT * FROM interviewer_tbl Where empid=" + req.body.empid;

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		}).error(function(error) {
			console.log(error);
		});
	}).error(function(error) {
		console.log(error);
	});
}

/*
	DELETE THE RECRUITER WITH EMP ID
*/
exports.delInterviewerById = function(req, res) {
	sequelize.query("DELETE FROM interviewer_tbl WHERE empid=" + req.params.id).success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log(error);
	});
};

/*
	UPDATE THE RECRUITER WITH EMP ID
*/
exports.putInterviewerById = function(req, res) {
	var query = "UPDATE interviewer_tbl SET";
	query += " " + "firstname = '" + req.body.firstname + "',";
	query += " " + "lastname = '" + req.body.lastname + "'";
	query += " WHERE empid=" + req.params.id + ";";
	var queryID = "SELECT * FROM interviewer_tbl Where empid=" + req.params.id;

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		});
	}).error(function(error) {
		console.log(error);
	});
}