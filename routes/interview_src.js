var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.postInterview = function(req, res){
	var query = "INSERT INTO interviewresponse_tbl (candiateName, interviewer_1_id, interviewer_2_id, recruiter_id, status_id, round_id, mode_id, description)";
	query += "VALUES (";
	query += " '" + req.body.candiateName +"',";
	query += req.body.interviewer_1_id +" ,";
	query += req.body.interviewer_2_id +" ,";
	query += req.body.recruiter_id +" ,";
	query += req.body.status_id +" ,";
	query += req.body.round_id +" ,";
	query += req.body.mode_id +" ,";
	query += " '" +req.body.description +"' )";

	var queryID = "SELECT * FROM interviewresponse_tbl ORDER BY id DESC LIMIT 1;";

	sequelize.query(query).success(function() {
		sequelize.query(queryID).success(function(rows){
			res.format({
				json: function() {
					res.send(rows);
				}
			});
		}).error(function(error){
			console.log("Query Error: " + error);
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};