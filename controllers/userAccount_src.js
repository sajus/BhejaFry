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
 * Description: Service is for changing user account password.
 *
 ***/
exports.postUserChange = function(req, res) {
	var payload = req.body,
		currentPassword = sanitize(payload.currentPassword).trim(),
		newPassword = sanitize(payload.newPassword).trim();

	var queryString = req.params,
		email = sanitize(queryString.email).trim();

	/*** Validate: email ***/
	try {
		check(email, {
			notNull: 'Specify email address.',
			isEmail: 'The email you specified is incorrect.',
			len: 'The email needs to be between %1 and %2 characters long.'
		}).notNull().isEmail().len(7, 40);
	} catch (e) {
		res.status(500).send(e.message);
	}

	/*** Validate: Current Password ***/
	try {
		check(currentPassword, {
			notNull: 'Enter your current password.',
			len: 'The current password needs to be between %1 and %2 characters long.'
		}).notNull().len(8, 80);
	} catch (e) {
		res.status(500).send(e.message);
	}

	/*** Validate: New Password ***/
	try {
		check(newPassword, {
			notNull: 'Enter your new password.',
			len: 'The new password needs to be between %1 and %2 characters long.'
		}).notNull().len(8, 80);
	} catch (e) {
		res.status(500).send(e.message);
	}

	var sql_selectIsEmail = "SELECT email FROM users_tbl a WHERE email = " + sqlString.escape(email) + " AND password = " + sqlString.escape(currentPassword) + " AND a.recycleBin = 0 LIMIT 1";
	sequelize.query(sql_selectIsEmail).success(function(rows) {
		if (rows.length === 0) {
			// The user email & password does not exist.
			res.status(500).send("The current password you entered is incorrect.");
		} else {
			// The user email & password is already exist.
			if (req.session.email === rows[0].email) {
				var sql_updatePassword = "UPDATE users_tbl SET password = " + sqlString.escape(newPassword) + " WHERE email = " + sqlString.escape(email);
				sequelize.query(sql_updatePassword).success(function() {
					res.send(req.params);
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			} else {
				res.status(403).send("The user session seems to be unauthorized.");
			}
		}
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: PUT
 * Description: Service is for reset user password.
 *
 ***/
exports.putReset = function(req, res) {
	sequelize.query("UPDATE users_tbl SET reset = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};



/**
 * Request Method: PUT
 * Description: Service is for updating user account lock or unlock state.
 *
 ***/
exports.putBlock = function(req, res) {
	sequelize.query("UPDATE users_tbl SET block = 1 WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: PUT
 * Description: Service is for updating user application release state.
 *
 ***/
exports.putRelease = function(req, res) {
	sequelize.query("UPDATE users_tbl SET appRelease = " + req.body.turnOff + " WHERE email='" + req.body.email + "'").success(function() {
		res.send(req.params);
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: POST
 * Description: Service is for getting user application release state.
 *
 ***/
exports.getRelease = function(req, res) {
	sequelize.query("SELECT appRelease FROM users_tbl WHERE email ='" + req.body.email + "' LIMIT 1 ").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows[0]);
			}
		});
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};