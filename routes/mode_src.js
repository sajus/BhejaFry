var sequelize = require('../config/dbConfig').sequelize,
	_ = require('../config/npmResources').underscore;

exports.getMode = function(req, res) {
	sequelize.query("SELECT * FROM  interviewmode_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});

	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};