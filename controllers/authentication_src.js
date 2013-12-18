/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: POST
 * Description: Service is for user authentication and send the response whether the user is authenticated.
 * If the user is valid, a session is started.
 * 
 ***/
exports.postAuthentication = function(req, res) {
	var payload = req.body,
		email = payload.email,
		password = payload.password;

	var selectQuery = "SELECT empid, email, firstname, lastname, accesstype, appRelease FROM users_tbl WHERE email='" + email + "' AND password='" + password + "' LIMIT 1 ";
	sequelize.query(selectQuery).success(function(rows) {
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
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Method: GET
 * Description: Service is for destroying user session.
 *
 ***/
exports.getCloseAuthentication = function(req, res) {
	delete req.session.user_id;
	res.send(req.params);
};