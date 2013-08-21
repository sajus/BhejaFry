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
	sequelize.query("SELECT * FROM users_tbl").success(function(rows) {
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
	sequelize.query("UPDATE users_tbl SET lastname='"+req.body.lastname+"' WHERE empid='"+req.params.id+"'").success(function() {
		console.log("Record updated successfully");
	}).error(function(error) {
		console.log(error);
	});
};

exports.delInterviewListById = function(req, res){
	sequelize.query("DELETE FROM users_tbl WHERE empid='"+req.params.id+"'").success(function() {
		console.log("Record deleted successfully");
	}).error(function(error) {
		console.log(error);
	});
};