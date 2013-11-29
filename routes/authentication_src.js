var sequelize = require('../config/dbConfig').sequelize,
	_ = require('../config/npmResources').underscore;

exports.postAuthentication = function(req, res) {
	var email = req.body.email,
		password = req.body.password;

	sequelize.query("SELECT empid, email, firstname, lastname, accesstype, appRelease FROM users_tbl WHERE email='" + email + "' AND password='" + password + "' LIMIT 1 ").success(function(rows) {
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
				"accesstype",
				"appRelease"
			], [
				true,
				rows[0].email,
				rows[0].firstname,
				rows[0].lastname,
				rows[0].accesstype,
				rows[0].appRelease
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

exports.getCloseAuthentication = function(req, res) {
	delete req.session.user_id;
	res.send(req.params);
};