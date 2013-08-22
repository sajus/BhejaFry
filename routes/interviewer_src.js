var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getInterviewer = function(req, res){
	sequelize.query("SELECT * FROM  interviewer_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};