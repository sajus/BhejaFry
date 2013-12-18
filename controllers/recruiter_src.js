/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: GET
 * Description: Service is for getting list of recuiter data.
 * 
 ***/
exports.getRecruiter = function(req, res) {
	sequelize.query("SELECT * FROM  recruiter_tbl ORDER BY firstname").success(function(rows) {
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
 * Request Method: GET
 * Description: Service is for getting recuiter details.
 *
 ***/
exports.getRecruiterById = function(req, res) {
	sequelize.query("SELECT * FROM  recruiter_tbl Where empid=" + req.params.id + " LIMIT 1").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows[0]);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
}

/**
 * Request Method: POST
 * Description: Service is for adding new recuiter data.
 *
 ***/
exports.postRecruiter = function(req, res) {
	var query = "INSERT INTO recruiter_tbl (empid,firstname,lastname)";
	query += "VALUES (";
	query += req.body.empid + ",";
	query += " '" + req.body.firstname + "',";
	query += " '" + req.body.lastname + "' )";

	var queryID = "SELECT * FROM recruiter_tbl Where empid=" + req.body.empid;

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
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
}

/**
 * Request Method: DELETE
 * Description: Service is for setting delete flag for recuiter data.
 *
 * 
 ***/
exports.delRecruiterById = function(req, res) {
	sequelize.query("DELETE FROM recruiter_tbl WHERE empid=" + req.params.id).success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: PUT
 * Description: Service is for updating recuiter details.
 *
 ***/
exports.putRecruiterById = function(req, res) {
	var query = "UPDATE recruiter_tbl SET";
	query += " " + "firstname='" + req.body.firstname + "',";
	query += " " + "lastname='" + req.body.lastname + "'";
	query += " WHERE empid=" + req.params.id + ";";

	var queryID = "SELECT * FROM recruiter_tbl Where empid=" + req.params.id;

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
}