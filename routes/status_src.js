var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.getStatus = function(req, res){
	sequelize.query().success(function() {

	}).error(function(error) {
		console.log(error);
	});
};