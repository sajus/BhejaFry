var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

/*
	GET THE LIST OF ALL USERS
*/
exports.getUsers = function(req, res){
	sequelize.query("SELECT empid, email, firstname, lastname, accesstype FROM  users_tbl ORDER BY firstname").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});

	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};
