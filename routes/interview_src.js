var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.postInterview = function(req, res){
	
	var query = "INSERT INTO interviewresponse_tbl(candiateName, interviewer_1_id, interviewer_2_id, recruiter_id, status_id, round_id, mode_id, description)";
	query += "VALUES (";
	query += " "+req.params.candiateName+",";
	query += " "+req.params.interviewer_1_id+",";
	query += " "+req.params.interviewer_2_id+",";
	query += " "+req.params.recruiter_id+",";
	query += " "+req.params.status_id+",";
	query += " "+req.params.round_id+",";
	query += " "+req.params.mode_id+",";
	query += " "+req.params.description+" ";
	query += " ); ";

	sequelize.query(query).success(function(rows) {
		console.log("Record added successfully");
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log(error);
	});
};