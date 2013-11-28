var sequelize = require('../config/dbconfig').sequelize,
	_ = require('../config/libresources').underscore;

exports.getStatus = function(req, res) {
	sequelize.query("SELECT * FROM  interviewstatus_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};