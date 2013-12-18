/**
 * Build-in | Third party module dependencies.
 ***/

var sequelize = require('../config/sqlzConfig').sequelize,
	_ = require('../config/npmConfig').underscore;

/**
 * Request Method: GET
 * Description: Service is for sending response with interview mode data.
 * 
 ***/
exports.getMode = function(req, res) {
	sequelize.query("SELECT * FROM  interviewmode_tbl").success(function(rows) {
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