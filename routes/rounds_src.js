var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getRounds = function(req, res){
	sequelize.query().success(function() {

	}).error(function(error) {
		console.log(error);
	});
};