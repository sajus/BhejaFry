/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	keygen = require('../config/npmConfig').keygen,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: GET
 * Description: Service is for getting list of user data.
 ***/
exports.getUsers = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var sql_selectUsers = "SELECT a.empid, a.email, a.firstname, a.lastname, b.roles FROM users_tbl a, userroles_tbl b WHERE a.role_id = b.roleid AND a.recycleBin = 0";
		sequelize.query(sql_selectUsers).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		}).error(function(error) {
			console.log('SQL Error:\n');
			console.log(error);
		});
	} else {
		res.status(403).send("The user session seems to be unauthorized.");
	}
};

/**
 * Request Method: GET
 * Description: Service is for getting user details.
 ***/
exports.getUsersByEmail = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var queryString = req.params,
			email = sanitize(queryString.email).trim();

		/*** Validate: email ***/
		try {
			check(email, {
				notNull: 'Specify user\'s email address.',
				isEmail: 'The user\'s email you specified is incorrect.',
				len: 'The user\'s email needs to be between %1 and %2 characters long.'
			}).notNull().isEmail().len(7, 40);
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_selectUser = "SELECT a.empid, a.email, a.firstname, a.lastname, a.role_id FROM users_tbl a WHERE email = " + sqlString.escape(email) + " AND a.recycleBin = 0 LIMIT 1";
		sequelize.query(sql_selectUser).success(function(rows) {
			res.format({
				json: function() {
					res.send(rows[0]);
				}
			});
		}).error(function(error) {
			console.log('SQL Error:\n');
			console.log(error);
		});
	} else {
		res.status(403).send("The user session seems to be unauthorized.");
	}
}

/**
 * Request Method: POST
 * Description: Service is for adding new user data.
 ***/
exports.postUser = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var payload = req.body,
			email = sanitize(payload.email).trim();

		/*** Validate: email ***/
		try {
			check(email, {
				notNull: 'Specify user\'s email address.',
				isEmail: 'The user\'s email you specified is incorrect.',
				len: 'The user\'s email needs to be between %1 and %2 characters long.'
			}).notNull().isEmail().len(7, 40);
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_isEmailDeleted = "SELECT a.email FROM users_tbl a WHERE a.email = " + sqlString.escape(email) + " AND a.recycleBin = 0";
		sequelize.query(sql_isEmailDeleted).success(function(rows) {
			if (rows.length === 0) {
				// The user email does not exist.
				var	empid = Number(sanitize(payload.empid).trim()),
					firstname = sanitize(payload.firstname).trim(),
					lastname = sanitize(payload.lastname).trim(),
					role_id = Number(sanitize(payload.role_id).trim());

				/*** Validate: empid ***/
				try {
					check(empid, {
						notNull: 'Specify user\'s employee ID.',
						isNumeric: 'The employee ID you specified is incorrect.'
					}).notNull().isNumeric();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: firstname ***/
				try {
					check(firstname, {
						notNull: 'Specify user\'s first name.',
						len: 'The user\'s first name needs to be between %1 and %2 characters long.',
						isAlpha: 'The user\'s first name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: lastname ***/
				try {
					check(lastname, {
						notNull: 'Specify user\'s last name.',
						len: 'The user\'s last name needs to be between %1 and %2 characters long.',
						isAlpha: 'The user\'s last name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: role_id ***/
				try {
					check(role_id, {
						notNull: 'Specify user\'s role.',
						isNumeric: 'The role you specified is incorrect.'
					}).notNull().isNumeric();
				} catch (e) {
					res.status(500).send(e.message);
				}

				var sql_isRole = "SELECT roleid FROM userroles_tbl WHERE roleid = " + sqlString.escape(role_id);
				sequelize.query(sql_isRole).success(function(rows) {
					if (rows.length === 0) {
						// The role does not exist.
						res.status(500).send("The role you specified is incorrect.");
					} else {
						// The role does exist.
						var sql_insertUserDetails = "INSERT INTO users_tbl ";
						sql_insertUserDetails += "(empid, firstname, lastname, email, role_id, recycleBin) ";
						sql_insertUserDetails += "VALUES (";
						sql_insertUserDetails += sqlString.escape(empid) + ", " + sqlString.escape(firstname) + ", " + sqlString.escape(lastname) + ", ";
						sql_insertUserDetails += sqlString.escape(email) + ", " + sqlString.escape(role_id) + ", " + 0 + " )";

						sequelize.query(sql_insertUserDetails).success(function() {
							res.send(req.params);
						}).error(function(error) {
							console.log('SQL Error:\n');
							console.log(error)
						});
					}
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			} else {
				// The user email is already exist and is not in recycleBin.
				res.status(500).send("User's email already exist.");
			}
		}).error(function(error) {
			console.log('SQL Error:\n');
			console.log(error);
		});
	} else {
		res.status(403).send("The user session seems to be unauthorized.");
	}
}

/**
 * Request Method: PUT
 * Description: Service is for updating user details.
 *
 ***/
exports.putUsersByEmail = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var queryString = req.params,
			email = sanitize(queryString.email).trim();

		/*** Validate: email ***/
		try {
			check(email, {
				notNull: 'Specify user\'s email address.',
				isEmail: 'The user\'s email you specified is incorrect.',
				len: 'The user\'s email needs to be between %1 and %2 characters long.'
			}).notNull().isEmail().len(7, 40);
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_isEmailDeleted = "SELECT a.email FROM users_tbl a WHERE a.email = " + sqlString.escape(email) + " AND a.recycleBin = 0";
		sequelize.query(sql_isEmailDeleted).success(function(rows) {
			if (rows.length === 0) {
				// The user email does not exist.
				res.status(500).send("The user's email you specified is incorrect.");
			} else {
				var payload = req.body,
					empid = Number(sanitize(payload.empid).trim()),
					firstname = sanitize(payload.firstname).trim(),
					lastname = sanitize(payload.lastname).trim(),
					email = sanitize(payload.email).trim(),
					role_id = sanitize(payload.role_id).trim();

				/*** Validate: empid ***/
				try {
					check(empid, {
						notNull: 'Specify user\'s employee ID.',
						isNumeric: 'The employee ID you specified is incorrect.'
					}).notNull().isNumeric();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: firstname ***/
				try {
					check(firstname, {
						notNull: 'Specify user\'s first name.',
						len: 'The user\'s first name needs to be between %1 and %2 characters long.',
						isAlpha: 'The user\'s first name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: lastname ***/
				try {
					check(lastname, {
						notNull: 'Specify user\'s last name.',
						len: 'The user\'s last name needs to be between %1 and %2 characters long.',
						isAlpha: 'The user\'s last name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: email ***/
				try {
					check(email, {
						notNull: 'Specify user\'s email address.',
						isEmail: 'The user\'s email you specified is incorrect.',
						len: 'The user\'s email needs to be between %1 and %2 characters long.'
					}).notNull().isEmail().len(7, 40);
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: role_id ***/
				try {
					check(role_id, {
						notNull: 'Specify user\'s role.',
						isNumeric: 'The role you specified is incorrect.'
					}).notNull().isNumeric();
				} catch (e) {
					res.status(500).send(e.message);
				}

				var sql_isRole = "SELECT roleid FROM userroles_tbl WHERE roleid = " + sqlString.escape(role_id);
				sequelize.query(sql_isRole).success(function(rows) {
					if (rows.length === 0) {
						// The role does not exist.
						res.status(500).send("The role you specified is incorrect.");
					} else {
						// The role does exist.
						var sql_updateUserDetails = "UPDATE users_tbl SET ";

						sql_updateUserDetails += "empid = " + sqlString.escape(empid) + ", ";
						sql_updateUserDetails += "fistname = " + sqlString.escape(firstname) + ", ";
						sql_updateUserDetails += "lastname = " + sqlString.escape(lastname) + ", ";
						sql_updateUserDetails += "email = " + sqlString.escape(email) + ", ";
						sql_updateUserDetails += "roleid = " + sqlString.escape(role_id) + " ";
						sql_updateUserDetails += "WHERE email = " + sqlString.escape(email);

						sequelize.query(sql_updateUserDetails).success(function() {
							res.send(req.params);
						}).error(function(error) {
							console.log('SQL Error:\n');
							console.log(error)
						});
					}
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			}
		}).error(function(error) {
			console.log('SQL Error:\n');
			console.log(error);
		});
	} else {
		res.status(403).send("The user session seems to be unauthorized.");
	}
};

/**
 * Request Method: DELETE
 * Description: Service is for setting delete flag for user data.
 *
 ***/
exports.delUsersByEmail = function(req, res) {
	var payload = req.body,
		ids = sanitize(payload.ids).trim();

	var sql_isIDDeleted = "SELECT empid FROM users_tbl a WHERE a.empid IN ( " + ids + " ) AND a.recycleBin = 0";
	sequelize.query(sql_isIDDeleted).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			res.status(500).send("The candidate's email you specified is incorrect.");
		} else {
			var isAllowed = null;
			if (req.session.roles === 'Administrator') {
				isAllowed = true;
			} else {
				isAllowed = false;
			}
			
			if (isAllowed) {
				var sql_updateIdDelFlag = "UPDATE users_tbl a SET a.recycleBin = 1 WHERE a.empid IN ( " + ids + " )";
				sequelize.query(sql_updateIdDelFlag).success(function() {
					res.send(req.params);
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error)
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