var sequelize = require('../config/dbconfig').sequelize,
	_ = require('../config/libresources').underscore;

exports.postAuthentication = function(req, res) {
	var email = req.body.email,
		password = req.body.password;

	sequelize.query("SELECT empid, email, firstname, lastname, accesstype FROM users_tbl WHERE email='" + email + "' AND password='" + password + "' LIMIT 1 ").success(function(rows) {
		var authentication = null;

		if (rows.length === 0) {
			authentication = _.object([
				"isAuthenticated"
			], [
				false
			]);
		} else {
			req.session.user_id = rows[0].empid;
			authentication = _.object([
				"isAuthenticated",
				"email",
				"firstname",
				"lastname",
				"accesstype"
			], [
				true,
				rows[0].email,
				rows[0].firstname,
				rows[0].lastname,
				rows[0].accesstype
			]);
		}

		res.format({
			json: function() {
				res.send(authentication);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.getDestroyAuthentication = function(req, res) {
	delete req.session.user_id;
	res.send(req.params);
};

exports.putResetAuthentication = function(req, res) {
	sequelize.query("UPDATE users_tbl SET reset = 1 WHERE email='" + req.body.email + "'").success(function() {
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

exports.getRelease = function(req, res) {
	sequelize.query("SELECT appRelease FROM users_tbl WHERE email ='" + req.query.email + "'").success(function(rows) {
		res.send(rows[0].appRelease);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.putAuthUnlock = function(req, res) {
	sequelize.query("UPDATE users_tbl SET block = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};