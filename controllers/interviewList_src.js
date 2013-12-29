/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize
moment = require('../config/npmConfig').moment,
	_ = require('../config/npmConfig').underscore,
	sqlString = require('../config/npmConfig').sqlString,
	check = require('../config/npmConfig').check,
	sanitize = require('../config/npmConfig').sanitize;

/**
 * Request Method: GET
 * Description: Service is for getting the list of interview and candidate data.
 *
 ***/
exports.getInterviewList = function(req, res) {
	var sql_selectCandidateInterviews = "SELECT interviewresponse_tbl.id, interviewresponse_tbl.cFirstName, interviewresponse_tbl.cLastName, interviewresponse_tbl.cEmail, interviewresponse_tbl.interviewDate, interviewer_tbl1.firstname as ivofirstname, interviewer_tbl1.lastname as ivolastname, interviewer_tbl2.firstname as ivtfirstname, interviewer_tbl2.lastname as ivtlastname, recruiter_tbl.firstname as rcfirstname, recruiter_tbl.lastname as rclastname, interviewmode_tbl.mode, interviewstatus_tbl.id as statusid, interviewstatus_tbl.status, interviewrounds_tbl.round FROM interviewresponse_tbl LEFT JOIN interviewer_tbl as interviewer_tbl1 ON interviewresponse_tbl.interviewer_1_id = interviewer_tbl1.empid LEFT JOIN interviewer_tbl as interviewer_tbl2 ON interviewresponse_tbl.interviewer_2_id = interviewer_tbl2.empid LEFT JOIN recruiter_tbl ON interviewresponse_tbl.recruiter_id = recruiter_tbl.empid LEFT JOIN interviewmode_tbl ON interviewresponse_tbl.mode_id = interviewmode_tbl.id LEFT JOIN interviewstatus_tbl ON interviewresponse_tbl.status_id = interviewstatus_tbl.id LEFT JOIN interviewrounds_tbl ON interviewresponse_tbl.round_id = interviewrounds_tbl.id WHERE interviewresponse_tbl.recycleBin = 0";

	sequelize.query(sql_selectCandidateInterviews).success(function(rows) {
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
 * Request Method: POST
 * Description: Service is for setting the interview and candidate details.
 *
 ***/
exports.postInterview = function(req, res) {
	var payload = req.body,
		cEmail_P = sanitize(payload.cEmail).trim();

	var sql_isCEmailAlready = "SELECT cEmail FROM interviewresponse_tbl a WHERE cEmail = " + sqlString.escape(cEmail_P) + " AND a.recycleBin = 0 LIMIT 1";
	sequelize.query(sql_isCEmailAlready).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			var payload = req.body,
				cFirstName = sanitize(payload.cFirstName).trim(),
				cLastName = sanitize(payload.cLastName).trim(),
				cEmail = sanitize(payload.cEmail).trim(),
				interviewer1 = sanitize(payload.interviewer_1_id).trim(),
				interviewer2 = sanitize(payload.interviewer_2_id).trim(),
				interviewDate = sanitize(payload.interviewDate).trim(),
				recruiterId = Number(sanitize(payload.recruiter_id).trim()),
				statusId = Number(sanitize(payload.status_id).trim()),
				roundId = Number(sanitize(payload.round_id).trim()),
				modeId = Number(sanitize(payload.mode_id).trim()),
				strength = sanitize(payload.strength).trim(),
				improveArea = sanitize(payload.improveArea).trim(),
				comments = sanitize(payload.comments).trim();

			try {
				/*** Validate: cFirstName ***/
				check(cFirstName, {
					notNull: 'Specify candidate\'s first name.',
					len: 'The candidate\'s first name needs to be between %1 and %2 characters long.',
					isAlpha: 'The candidate\'s first name you specified is incorrect.'
				}).notNull().len(2, 30).isAlpha();

				/*** Validate: cLastName ***/
				check(cLastName, {
					notNull: 'Specify candidate\'s last name.',
					len: 'The candidate\'s last name needs to be between %1 and %2 characters long.',
					isAlpha: 'The candidate\'s last name you specified is incorrect.'
				}).notNull().len(2, 30).isAlpha();

				/*** Validate: cEmail ***/
				check(cEmail, {
					notNull: 'Specify candidate\'s email address.',
					isEmail: 'The candidate\'s email you specified is incorrect.',
					len: 'The candidate\'s email needs to be between %1 and %2 characters long.'
				}).notNull().isEmail().len(7, 40);

				/*** Validate: interviewer1 ***/
				check(interviewer1, {
					notNull: 'Specify at least 1 interviewer.',
					isNumeric: 'The interviewer you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: recruiterId ***/
				check(recruiterId, {
					notNull: 'Specify the recruiter.',
					isNumeric: 'The recruiter you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: statusId ***/
				check(statusId, {
					notNull: 'Specify the status.',
					isNumeric: 'The status you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: roundId ***/
				check(roundId, {
					notNull: 'Specify the round.',
					isNumeric: 'The round you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: modeId ***/
				check(modeId, {
					notNull: 'Specify the mode.',
					isNumeric: 'The mode you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: comments ***/
				check(comments, {
					notNull: 'Specify the comments.'
				}).notNull();

			} catch (e) {
				res.status(500).send(e.message);
			}

			var sql_isInterviewer1 = "SELECT empid FROM interviewer_tbl WHERE empid = " + sqlString.escape(interviewer1);
			sequelize.query(sql_isInterviewer1).success(function(rows) {
				if (rows.length === 0) {
					// The interviewer does not exist.
					res.status(500).send("The interviewer you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			if (interviewer2 !== 'null' && interviewer2 !== '') {
				var sql_isInterviewer2 = "SELECT empid FROM interviewer_tbl WHERE empid = " + sqlString.escape(interviewer2);
				sequelize.query(sql_isInterviewer2).success(function(rows) {
					if (rows.length === 0) {
						// The interviewer does not exist.
						res.status(500).send("The interviewer you specified is incorrect.");
					}
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			}

			var sql_isRecruiter = "SELECT empid FROM recruiter_tbl WHERE empid = " + sqlString.escape(recruiterId);
			sequelize.query(sql_isRecruiter).success(function(rows) {
				if (rows.length === 0) {
					// The recruiter does not exist.
					res.status(500).send("The recruiter you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isStatus = "SELECT id FROM interviewstatus_tbl WHERE id = " + sqlString.escape(statusId);
			sequelize.query(sql_isStatus).success(function(rows) {
				if (rows.length === 0) {
					// The status does not exist.
					res.status(500).send("The status you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isRound = "SELECT id FROM interviewrounds_tbl WHERE id = " + sqlString.escape(roundId);
			sequelize.query(sql_isRound).success(function(rows) {
				if (rows.length === 0) {
					// The round does not exist.
					res.status(500).send("The round you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isMode = "SELECT id FROM interviewmode_tbl WHERE id = " + sqlString.escape(modeId);
			sequelize.query(sql_isMode).success(function(rows) {
				if (rows.length === 0) {
					// The mode does not exist.
					res.status(500).send("The mode you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_insertCEmailData = "INSERT INTO interviewresponse_tbl ";
			sql_insertCEmailData += "(cFirstName, cLastName, cEmail, interviewer_1_id, interviewer_2_id, interviewDate, recruiter_id, status_id, round_id, mode_id, strength, improveArea, comments, recycleBin) ";
			sql_insertCEmailData += "VALUES (";
			sql_insertCEmailData += sqlString.escape(cFirstName) + ", " + sqlString.escape(cLastName) + ", " + sqlString.escape(cEmail) + ", ";
			sql_insertCEmailData += sqlString.escape(Number(interviewer1)) + ", ";
			sql_insertCEmailData += (interviewer2 === 'null' || interviewer2 === '') ? null + ", " : sqlString.escape(Number(interviewer2)) + ", ";
			sql_insertCEmailData += sqlString.escape(interviewDate) + ", ";
			sql_insertCEmailData += sqlString.escape(recruiterId) + ", " + sqlString.escape(statusId) + ", " + sqlString.escape(roundId) + ", " + sqlString.escape(modeId) + ", ";
			sql_insertCEmailData += (strength === 'null' || strength === '') ? null + ", " : sqlString.escape(strength) + ", ";
			sql_insertCEmailData += (improveArea === 'null' || improveArea === '') ? null + ", " : sqlString.escape(improveArea) + ", ";
			sql_insertCEmailData += sqlString.escape(comments) + ", " + 0 + " )";

			sequelize.query(sql_insertCEmailData).success(function() {
				res.send(req.params);
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error)
			});
		} else {
			// The candidate email is already exist and is not in recycleBin.
			res.status(500).send("Candidate's email already exist.");
		}
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: GET
 * Description: Service is for getting interview and candidate details.
 *
 ***/
exports.getInterviewListByEmail = function(req, res) {
	var queryString = req.params,
		cEmail = sanitize(queryString.cEmail).trim();

	/*** Validate: cEmail ***/
	try {
		check(cEmail, {
			notNull: 'Specify candidate\'s email address.',
			isEmail: 'The candidate\'s email you specified is incorrect.',
			len: 'The candidate\'s email needs to be between %1 and %2 characters long.'
		}).notNull().isEmail().len(7, 40);
	} catch (e) {
		res.status(500).send(e.message);
	}

	var sql_isCEmailDeleted = "SELECT cEmail FROM interviewresponse_tbl a WHERE cEmail = " + sqlString.escape(cEmail) + " AND a.recycleBin = 0";
	sequelize.query(sql_isCEmailDeleted).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			res.status(500).send("The candidate's email you specified is incorrect.");
		} else {
			// The candidate email is already exist.
			var sql_selectCEmailData = "SELECT id, cFirstName, cLastName, cEmail, interviewer_1_id, interviewer_2_id, interviewDate, recruiter_id, status_id, round_id, mode_id, strength, improveArea, comments FROM interviewresponse_tbl a WHERE cEmail = " + sqlString.escape(cEmail) + " AND a.recycleBin = 0 LIMIT 1";

			sequelize.query(sql_selectCEmailData).success(function(rows) {
				var details = {
					"id": rows[0].id,
					"cFirstName": rows[0].cFirstName,
					"cLastName": rows[0].cLastName,
					"cEmail": rows[0].cEmail,
					"interviewer_1_id": rows[0].interviewer_1_id,
					"interviewer_2_id": rows[0].interviewer_2_id,
					"interviewDate": rows[0].interviewDate,
					"recruiter_id": rows[0].recruiter_id,
					"status_id": rows[0].status_id,
					"round_id": rows[0].round_id,
					"mode_id": rows[0].mode_id,
					"strength": rows[0].strength,
					"improveArea": rows[0].improveArea,
					"comments": rows[0].comments
				}

				res.format({
					json: function() {
						res.send(details);
					}
				});

			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error)
			});
		}
	}).error(function(error) {
		console.log('SQL Error:\n');
		console.log(error);
	});
};

/**
 * Request Method: PUT
 * Description: Service is for updating interview and candidate details.
 *
 ***/
exports.putInterviewListByEmail = function(req, res) {
	var queryString = req.params,
		cEmail = sanitize(queryString.cEmail).trim();

	/*** Validate: cEmail ***/
	try {
		check(cEmail, {
			notNull: 'Specify candidate\'s email address.',
			isEmail: 'The candidate\'s email you specified is incorrect.'
		}).notNull().isEmail();
		check(cEmail, 'The candidate\'s email needs to be between %1 and %2 characters long.').len(7, 40);
	} catch (e) {
		res.status(500).send(e.message);
	}

	var sql_isCEmailDeleted = "SELECT cEmail FROM interviewresponse_tbl a WHERE cEmail = " + sqlString.escape(cEmail) + " AND a.recycleBin = 0";
	sequelize.query(sql_isCEmailDeleted).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			res.status(500).send("The candidate's email you specified is incorrect.");
		} else {
			// The candidate email is already exist.
			var payload = req.body,
				cFirstName = sanitize(payload.cFirstName).trim(),
				cLastName = sanitize(payload.cLastName).trim(),
				cEmail_P = sanitize(payload.cEmail).trim(),
				interviewer1 = sanitize(payload.interviewer_1_id).trim(),
				interviewer2 = sanitize(payload.interviewer_2_id).trim(),
				interviewDate = sanitize(payload.interviewDate).trim(),
				recruiterId = Number(sanitize(payload.recruiter_id).trim()),
				statusId = Number(sanitize(payload.status_id).trim()),
				roundId = Number(sanitize(payload.round_id).trim()),
				modeId = Number(sanitize(payload.mode_id).trim()),
				strength = sanitize(payload.strength).trim(),
				improveArea = sanitize(payload.improveArea).trim(),
				comments = sanitize(payload.comments).trim();

			try {
				/*** Validate: cFirstName ***/
				check(cFirstName, {
					notNull: 'Specify candidate\'s first name.',
					len: 'The candidate\'s first name needs to be between %1 and %2 characters long.',
					isAlpha: 'The candidate\'s first name you specified is incorrect.'
				}).notNull().len(2, 30).isAlpha();

				/*** Validate: cLastName ***/
				check(cLastName, {
					notNull: 'Specify candidate\'s last name.',
					len: 'The candidate\'s last name needs to be between %1 and %2 characters long.',
					isAlpha: 'The candidate\'s last name you specified is incorrect.'
				}).notNull().len(2, 30).isAlpha();

				/*** Validate: cEmail ***/
				check(cEmail_P, {
					notNull: 'Specify candidate\'s email address.',
					isEmail: 'The candidate\'s email you specified is incorrect.',
					len: 'The candidate\'s email needs to be between %1 and %2 characters long.'
				}).notNull().isEmail().len(7, 40);

				/*** Validate: interviewer1 ***/
				check(interviewer1, {
					notNull: 'Specify at least 1 interviewer.',
					isNumeric: 'The interviewer you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: recruiterId ***/
				check(recruiterId, {
					notNull: 'Specify the recruiter.',
					isNumeric: 'The recruiter you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: statusId ***/
				check(statusId, {
					notNull: 'Specify the status.',
					isNumeric: 'The status you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: roundId ***/
				check(roundId, {
					notNull: 'Specify the round.',
					isNumeric: 'The round you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: modeId ***/
				check(modeId, {
					notNull: 'Specify the mode.',
					isNumeric: 'The mode you specified is incorrect.'
				}).notNull().isNumeric();

				/*** Validate: comments ***/
				check(comments, {
					notNull: 'Specify the comments.'
				}).notNull();

			} catch (e) {
				res.status(500).send(e.message);
			}

			var sql_isInterviewer1 = "SELECT empid FROM interviewer_tbl WHERE empid = " + sqlString.escape(interviewer1);
			sequelize.query(sql_isInterviewer1).success(function(rows) {
				if (rows.length === 0) {
					// The interviewer does not exist.
					res.status(500).send("The interviewer you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			if (interviewer2 !== 'null' && interviewer2 !== '') {
				var sql_isInterviewer2 = "SELECT empid FROM interviewer_tbl WHERE empid = " + sqlString.escape(interviewer2);
				sequelize.query(sql_isInterviewer2).success(function(rows) {
					if (rows.length === 0) {
						// The interviewer does not exist.
						res.status(500).send("The interviewer you specified is incorrect.");
					}
				}).error(function(error) {
					console.log('SQL Error:\n');
					console.log(error);
				});
			}

			var sql_isRecruiter = "SELECT empid FROM recruiter_tbl WHERE empid = " + sqlString.escape(recruiterId);
			sequelize.query(sql_isRecruiter).success(function(rows) {
				if (rows.length === 0) {
					// The recruiter does not exist.
					res.status(500).send("The recruiter you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isStatus = "SELECT id FROM interviewstatus_tbl WHERE id = " + sqlString.escape(statusId);
			sequelize.query(sql_isStatus).success(function(rows) {
				if (rows.length === 0) {
					// The status does not exist.
					res.status(500).send("The status you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isRound = "SELECT id FROM interviewrounds_tbl WHERE id = " + sqlString.escape(roundId);
			sequelize.query(sql_isRound).success(function(rows) {
				if (rows.length === 0) {
					// The round does not exist.
					res.status(500).send("The round you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_isMode = "SELECT id FROM interviewmode_tbl WHERE id = " + sqlString.escape(modeId);
			sequelize.query(sql_isMode).success(function(rows) {
				if (rows.length === 0) {
					// The mode does not exist.
					res.status(500).send("The mode you specified is incorrect.");
				}
			}).error(function(error) {
				console.log('SQL Error:\n');
				console.log(error);
			});

			var sql_updateCEmailData = "UPDATE interviewresponse_tbl SET ";
			sql_updateCEmailData += "cFirstName = " + sqlString.escape(cFirstName) + ", ";
			sql_updateCEmailData += "cLastName = " + sqlString.escape(cLastName) + ", ";
			sql_updateCEmailData += "cEmail = " + sqlString.escape(cEmail_P) + ", ";
			sql_updateCEmailData += "interviewer_1_id = " + sqlString.escape(Number(interviewer1)) + ", ";

			sql_updateCEmailData += (interviewer2 === 'null' || interviewer2 === '') ? "interviewer_2_id = " + null + ", " : "interviewer_2_id = " + sqlString.escape(Number(interviewer2)) + ", ";
			sql_updateCEmailData += "interviewDate = " + sqlString.escape(interviewDate) + ", ";

			sql_updateCEmailData += "recruiter_id = " + sqlString.escape(recruiterId) + ", ";
			sql_updateCEmailData += "status_id = " + sqlString.escape(statusId) + ", ";
			sql_updateCEmailData += "round_id = " + sqlString.escape(roundId) + ", ";
			sql_updateCEmailData += "mode_id = " + sqlString.escape(modeId) + ", ";

			sql_updateCEmailData += (strength === 'null' || strength === '') ? "strength = " + null + ", " : "strength = " + sqlString.escape(strength) + ", ";
			sql_updateCEmailData += (improveArea === 'null' || improveArea === '') ? "improveArea = " + null + ", " : "improveArea = " + sqlString.escape(improveArea) + ", ";

			sql_updateCEmailData += "comments = " + sqlString.escape(comments) + " ";

			sql_updateCEmailData += "WHERE cEmail = " + sqlString.escape(cEmail);

			console.log(sql_updateCEmailData);

			sequelize.query(sql_updateCEmailData).success(function() {
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
};

/**
 * Request Method: DELETE
 * Description:  Service is for updating delete flag for interview datails.
 *
 ***/
exports.delInterviewListByEmail = function(req, res) {
	var queryString = req.params,
		cEmail = sanitize(queryString.cEmail).trim();

	/*** Validate: cEmail ***/
	try {
		check(cEmail, {
			notNull: 'Specify candidate\'s email address.',
			isEmail: 'The candidate\'s email you specified is incorrect.',
			len: 'The candidate\'s email needs to be between %1 and %2 characters long.'
		}).notNull().isEmail().len(7, 40);
	} catch (e) {
		res.status(500).send(e.message);
	}

	var sql_isCEmailDeleted = "SELECT cEmail FROM interviewresponse_tbl a WHERE cEmail = " + sqlString.escape(cEmail) + " AND a.recycleBin = 0";
	sequelize.query(sql_isCEmailDeleted).success(function(rows) {
		if (rows.length === 0) {
			// The candidate email does not exist.
			res.status(500).send("The candidate's email you specified is incorrect.");
		} else {
			// The candidate email is already exist.
			var sql_updateCEmailDelFlag = "UPDATE interviewresponse_tbl a SET a.recycleBin = 1 WHERE cEmail = " + sqlString.escape(cEmail) + " AND a.recycleBin = 0";

			sequelize.query(sql_updateCEmailDelFlag).success(function() {
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
};