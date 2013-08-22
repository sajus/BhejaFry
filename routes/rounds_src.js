var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getRounds = function(req, res){
	sequelize.query("SELECT * FROM  interviewrounds_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};