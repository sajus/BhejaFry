var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

exports.putReset = function(req, res) {
	sequelize.query("UPDATE users_tbl SET reset = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.postUserChange = function(req, res) {
	var currentPassword = req.body.currentPassword,
		newPassword = req.body.newPassword,
		email = req.params.email;

	var selectQuery = "SELECT email FROM users_tbl WHERE email='" + email + "' and password='" + currentPassword + "'";
	sequelize.query(selectQuery).success(function(rows) {
		if (rows.length === 0) {
			res.status(401).send({
				error: '401 Authentication failed: Authentication is required and has failed'
			});
		} else {
			var updateQuery = "UPDATE users_tbl SET password='" + newPassword + "' WHERE email='" + email + "'";
			sequelize.query(updateQuery).success(function() {
				res.send(req.params);
			}).error(function(error) {
				console.log("Query Error: " + error);
			});
		}
	}).error(function(error) {
		console.log("Query Error: " + error);

	});
};

exports.putBlock = function(req, res) {
	sequelize.query("UPDATE users_tbl SET block = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.putRelease = function(req, res) {
	sequelize.query("UPDATE users_tbl SET appRelease = " + req.body.turnOff + " WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.postRelease = function(req, res) {
	sequelize.query("SELECT appRelease FROM users_tbl WHERE email ='" + req.body.email + "' LIMIT 1 ").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows[0]);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};