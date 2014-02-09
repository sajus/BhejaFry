/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: GET
 * Description: Service is for getting list of recuiter data.
 ***/
exports.getRecruiter = function(req, res) {
	sequelize.query("SELECT empid, firstname, lastname FROM  recruiter_tbl WHERE recycleBin = 0 ORDER BY firstname").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});

	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: GET
 * Description: Service is for getting recuiter details.
 ***/
exports.getRecruiterById = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var queryString = req.params,
			empid = Number(sanitize(queryString.id).trim());

		/*** Validate: empid ***/
		try {
			check(empid, {
				notNull: 'Specify recruiter\'s employee ID.',
				isNumeric: 'The employee ID you specified is incorrect.'
			}).notNull().isNumeric();
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_selectRecruiter = "SELECT a.empid, a.firstname, a.lastname FROM recruiter_tbl a WHERE empid = " + sqlString.escape(empid) + " AND a.recycleBin = 0 LIMIT 1";
		sequelize.query(sql_selectRecruiter).success(function(rows) {
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
};

/**
 * Request Method: POST
 * Description: Service is for adding new recuiter data.
 ***/
exports.postRecruiter = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var payload = req.body,
			empid = Number(sanitize(payload.empid).trim());

		/*** Validate: empid ***/
		try {
			check(empid, {
				notNull: 'Specify recruiter\'s employee ID.',
				isNumeric: 'The employee ID you specified is incorrect.'
			}).notNull().isNumeric();
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_isEmpidDeleted = "SELECT a.empid FROM recruiter_tbl a WHERE a.empid = " + sqlString.escape(empid) + " AND a.recycleBin = 0";
		sequelize.query(sql_isEmpidDeleted).success(function(rows) {
			if (rows.length === 0) {
				var firstname = sanitize(payload.firstname).trim(),
					lastname = sanitize(payload.lastname).trim();

				/*** Validate: firstname ***/
				try {
					check(firstname, {
						notNull: 'Specify recruiter\'s first name.',
						len: 'The recruiter\'s first name needs to be between %1 and %2 characters long.',
						isAlpha: 'The recruiter\'s first name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: lastname ***/
				try {
					check(lastname, {
						notNull: 'Specify recruiter\'s last name.',
						len: 'The recruiter\'s last name needs to be between %1 and %2 characters long.',
						isAlpha: 'The recruiter\'s last name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				var sql_insertRecruiterDetails = "INSERT INTO recruiter_tbl ";
				sql_insertRecruiterDetails += "(empid, firstname, lastname, recycleBin) ";
				sql_insertRecruiterDetails += "VALUES ( ";
				sql_insertRecruiterDetails += sqlString.escape(empid) + ", " + sqlString.escape(firstname) + ", ";
				sql_insertRecruiterDetails += sqlString.escape(lastname) + ", " + 0 + " )";

				sequelize.query(sql_insertRecruiterDetails).success(function() {
					res.send(req.params);
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error)
				});
			} else {
				// The recruiter is already exist and is not in recycleBin.
				res.status(500).send("Interviewer already exist.");
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
 * Request Method: PUT
 * Description: Service is for updating recuiter details.
 ***/
exports.putRecruiterById = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var queryString = req.params,
			empid = Number(sanitize(queryString.id).trim());

		/*** Validate: empid ***/
		try {
			check(empid, {
				notNull: 'Specify recruiter\'s employee ID.',
				isNumeric: 'The employee ID you specified is incorrect.'
			}).notNull().isNumeric();
		} catch (e) {
			res.status(500).send(e.message);
		}

		var sql_isEmpidDeleted = "SELECT a.empid FROM recruiter_tbl a WHERE a.empid = " + sqlString.escape(empid) + " AND a.recycleBin = 0";
		sequelize.query(sql_isEmpidDeleted).success(function(rows) {
			if (rows.length === 0) {
				// The recruiter email does not exist.
				res.status(500).send("The recruiter you specified is incorrect.");
			} else {
				var payload = req.body,
					empid = Number(sanitize(payload.empid).trim()),
					firstname = sanitize(payload.firstname).trim(),
					lastname = sanitize(payload.lastname).trim();

				/*** Validate: empid ***/
				try {
					check(empid, {
						notNull: 'Specify recruiter\'s employee ID.',
						isNumeric: 'The employee ID you specified is incorrect.'
					}).notNull().isNumeric();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: firstname ***/
				try {
					check(firstname, {
						notNull: 'Specify recruiter\'s first name.',
						len: 'The recruiter\'s first name needs to be between %1 and %2 characters long.',
						isAlpha: 'The recruiter\'s first name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				/*** Validate: lastname ***/
				try {
					check(lastname, {
						notNull: 'Specify recruiter\'s last name.',
						len: 'The recruiter\'s last name needs to be between %1 and %2 characters long.',
						isAlpha: 'The recruiter\'s last name you specified is incorrect.'
					}).notNull().len(2, 30).isAlpha();
				} catch (e) {
					res.status(500).send(e.message);
				}

				var sql_updateRecruiterDetails = "UPDATE recruiter_tbl SET ";

				sql_updateRecruiterDetails += "empid = " + sqlString.escape(empid) + ", ";
				sql_updateRecruiterDetails += "firstname = " + sqlString.escape(firstname) + ", ";
				sql_updateRecruiterDetails += "lastname = " + sqlString.escape(lastname);
				sql_updateRecruiterDetails += " WHERE empid = " + sqlString.escape(empid);

				sequelize.query(sql_updateRecruiterDetails).success(function() {
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
		res.status(403).send("The user session seems to be unauthorized.");
	}
};

/**
 * Request Method: DELETE
 * Description: Service is for setting delete flag for recruiter data.
 ***/
exports.delRecruiter = function(req, res) {
	if (req.session.roles === 'Administrator') {
		var payload = req.body,
			ids = sanitize(payload.ids).trim();

		var sql_isIDDeleted = "SELECT empid FROM recruiter_tbl a WHERE a.empid IN ( " + ids + " ) AND a.recycleBin = 0";
		sequelize.query(sql_isIDDeleted).success(function(rows) {
			if (rows.length === 0) {
				// The recruiter email does not exist.
				res.status(500).send("The recruiter's email you specified is incorrect.");
			} else {
				var sql_updateIdDelFlag = "UPDATE recruiter_tbl a SET a.recycleBin = 1 WHERE a.empid IN ( " + ids + " )";
				sequelize.query(sql_updateIdDelFlag).success(function() {
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
		res.status(403).send("The user session seems to be unauthorized.");
	}
};