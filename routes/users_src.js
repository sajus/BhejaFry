var sequelize = require('../config/sqlzConfig').sequelize,
	keygen = require('../config/npmConfig').keygen,
	_ = require('../config/npmConfig').underscore;

/*
	GET THE LIST OF ALL USERS
*/
exports.getUsers = function(req, res) {
	sequelize.query("SELECT empid, email, firstname, lastname, accesstype FROM  users_tbl ORDER BY firstname").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});

	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

/*
	GET THE DETAILS OF THE USERS WITH EMP ID
*/
exports.getUsersById = function(req, res) {
	sequelize.query("SELECT empid, email, firstname, lastname, accesstype FROM  users_tbl Where empid=" + req.params.id + " LIMIT 1").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows[0]);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
}

/*
	ADD THE NEW RECRUITER WITH EMP ID
*/
exports.postUser = function(req, res) {
	var query = "INSERT INTO users_tbl (empid,email,firstname,lastname,accesstype,password)";
	query += "VALUES (";
	query += req.body.empid + ",";
	query += " '" + req.body.email + "',";
	query += " '" + req.body.firstname + "',";
	query += " '" + req.body.lastname + "',";
	query += " " + req.body.accesstype + ",";
	query += " '" + keygen(12, false) + "' )";
	var queryID = "SELECT empid,firstname,lastname,accesstype FROM users_tbl Where empid=" + req.body.empid;

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
}

/*
	DELETE THE USER WITH EMP ID
*/
exports.delUsersById = function(req, res) {
	sequelize.query("DELETE FROM users_tbl WHERE empid=" + req.params.id).success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

/*
	UPDATE THE USER WITH EMP ID
*/
exports.putUsersById = function(req, res) {
	var query = "UPDATE users_tbl SET";
	query += " " + "firstname='" + req.body.firstname + "',";
	query += " " + "lastname='" + req.body.lastname + "',";
	query += " " + "accesstype='" + req.body.accesstype + "'";
	query += " WHERE empid=" + req.params.id + ";";

	var queryID = "SELECT empid,firstname,lastname,accesstype FROM users_tbl Where empid=" + req.params.id;

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
}