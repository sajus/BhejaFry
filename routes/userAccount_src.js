var sequelize = require('../config/dbConfig').sequelize,
	_ = require('../config/npmResources').underscore;

exports.putReset = function(req, res) {
	sequelize.query("UPDATE users_tbl SET reset = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
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