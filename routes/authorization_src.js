var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.postAuthorization = function(req, res){
	var email 		= req.body.email
	,	password 	= req.body.password;
	sequelize.query("SELECT email, firstname, lastname FROM users_tbl WHERE email='"+email+"' AND password='"+password+"' LIMIT 1 ").success(function(rows) {
		var authorization = null;

		if(rows.length===0) {
			var authorization = _.object([
					"isAuthenticated"
				], [
					false
				]);
		} else {
			var authorization = _.object([
					"isAuthenticated",
					"email",
					"firstname",
					"lastname"
				],[
					true,
					rows[0].email,
					rows[0].firstname,
					rows[0].lastname
				]);
		}

		res.format({
			json: function() {
				res.send(authorization);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};