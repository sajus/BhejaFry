var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getInterviewList = function(req, res){
	sequelize.query("SELECT * FROM interviewresponse_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
		// res.jsonp(rows);
	}).error(function(error) {
		console.log(error);
	});
};

exports.getInterviewListById = function(req, res){
	sequelize.query("SELECT * FROM interviewresponse_tbl WHERE id='"+req.params.id).success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
		// res.jsonp(rows);
	}).error(function(error) {
		console.log(error);
	});
};

exports.putInterviewListById = function(req, res){

	var query = "UPDATE interviewresponse_tbl SET";
	query +=" "+"candiateName = "+req.params.candiateName+",";
	query +=" "+"interviewer_1_id = "+req.params.interviewer_1_id+",";
	query +=" "+"interviewer_2_id = "+req.params.interviewer_2_id+",";
	query +=" "+"recruiter_id = "+req.params.recruiter_id+",";
	query +=" "+"status_id = "+req.params.status_id+",";
	query +=" "+"round_id = "+req.params.round_id+",";
	query +=" "+"mode_id = "+req.params.mode_id+",";
	query +=" "+"description = "+req.params.description+"";
	query +=" WHERE id ="+req.params.id+";";

	sequelize.query(query).success(function() {
		console.log("Record updated successfully");
	}).error(function(error) {
		console.log(error);
	});
};

exports.delInterviewListById = function(req, res){
	sequelize.query("DELETE FROM interviewresponse_tbl WHERE id='"+req.params.id+"'").success(function() {
		console.log("Record deleted successfully");
	}).error(function(error) {
		console.log(error);
	});
};