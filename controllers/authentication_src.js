/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore,
	sqlString = require('../config/npmConfig').sqlString,
	check = require('../config/npmConfig').check,
	sanitize = require('../config/npmConfig').sanitize;

/**
 * Request Method: POST
 * Description: Service is for user authentication and send the response whether the user is authenticated.
 * If the user is valid, a session is started.
 *
 ***/
exports.postAuthentication = function(req, res) {
	var payload = req.body,
		email = sanitize(payload.email).trim(),
		password = sanitize(payload.password).trim();

	/*** Validate: Email ***/
	try {
		check(email, {
			notNull: 'Enter your email address.',
			isEmail: 'The email you entered is incorrect.'
		}).notNull().isEmail();
		check(email, 'The email needs to be between %1 and %2 characters long.').len(7, 40);
	} catch (e) {
		res.status(500).send(e.message);
	}

	/*** Validate: Password ***/
	try {
		check(password, 'Enter your password.').notNull();
		check(password, 'The password needs to be between %1 and %2 characters long.').len(8, 80);
	} catch (e) {
		res.status(500).send(e.message);
	}

	var sql_selectAuthUser = "SELECT a.empid, a.email, a.firstname, a.lastname, a.appRelease, b.roles FROM users_tbl a, userroles_tbl b WHERE email = " + sqlString.escape(email) + " AND password = " + sqlString.escape(password) + " AND a.role_id = b.roleid LIMIT 1 ";
	sequelize.query(sql_selectAuthUser).success(function(rows) {
		if (rows.length === 0) {
			res.status(401).send('The email or password you entered is incorrect.');
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