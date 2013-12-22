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

	var sql_selectAuthUser = "SELECT a.empid, a.email, a.firstname, a.lastname, a.appRelease, b.roles FROM users_tbl a, userroles_tbl b WHERE email='" + email + "' AND password='" + password + "' AND a.role_id = b.roleid LIMIT 1 ";
	sequelize.query(sql_selectAuthUser).success(function(rows) {
		if (rows.length === 0) {
			res.status(401).send('Authentication is required and has failed or has not yet been provided.');
		} else {
			req.session.user_id = rows[0].empid;
			var authentication = _.object([
				"isAuthenticated",
				"email",
				"username",
				"appRelease",
				"roles"
			], [
				true,
				rows[0].email,
				rows[0].firstname + ' ' + rows[0].lastname,
				rows[0].appRelease,
				rows[0].roles
			]);

			res.format({
				json: function() {
					res.send(authentication);
				}
			});
		}
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