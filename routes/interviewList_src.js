var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getInterviewList = function(req, res){
	sequelize.query("SELECT * FROM interviewresponse_tbl WHERE deleteFlag=0 ORDER BY candiateName;").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
		// res.jsonp(rows);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.getInterviewListById = function(req, res){
	sequelize.query("SELECT * FROM interviewresponse_tbl WHERE id="+req.params.id+" AND deleteFlag=0 LIMIT 1").success(function(rows) {
		var userDetails = _.object([
				"id",
				"candiateName",
				"interviewer_1_id",
				"interviewer_2_id",
				"interviewDate",
				"recruiter_id",
				"status_id",
				"round_id",
				"mode_id",
				"description",
				"deleteFlag"
			],[
				rows[0].id,
				rows[0].candiateName,
				rows[0].interviewer_1_id,
				rows[0].interviewer_2_id,
				rows[0].interviewDate,
				rows[0].recruiter_id,
				rows[0].status_id,
				rows[0].round_id,
				rows[0].mode_id,
				rows[0].description,
				0
			]);
		res.format({
			json: function() {
				res.send(userDetails);
			}
		});
		// res.jsonp(rows);
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};

exports.putInterviewListById = function(req, res){
	var query = "UPDATE interviewresponse_tbl SET";
	query +=" "+"candiateName = '"+req.body.candiateName+"',";
	query +=" "+"interviewer_1_id = "+req.body.interviewer_1_id+",";
	query +=" "+"interviewer_2_id = "+req.body.interviewer_2_id+",";
	query +=" "+"interviewDate = "+req.body.interviewDate+",";
	query +=" "+"recruiter_id = "+req.body.recruiter_id+",";
	query +=" "+"status_id = "+req.body.status_id+",";
	query +=" "+"round_id = "+req.body.round_id+",";
	query +=" "+"mode_id = "+req.body.mode_id+",";
	query +=" "+"description = '"+req.body.description+"',";
	query +=" "+"deleteFlag = "+req.body.deleteFlag+""; //BACKBONE MODEL TEST
	query +=" WHERE id ="+req.params.id+";";

	sequelize.query(query).success(function() {
		res.send(req.params);
	}).error(function(error) {
	});
};

exports.delInterviewListById = function(req, res){
	var query = "UPDATE interviewresponse_tbl SET";
	query +=" "+"deleteFlag = 1 WHERE id ="+req.params.id+";"

	sequelize.query(query).success(function() {
		res.send(req.params);
	}).error(function(error) {
	});
};