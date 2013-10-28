var sequelize = require('../dbconfig').sequelize
,           _ = require('../libresources').underscore;

exports.postAuthentication = function(req, res){
	var email 		= req.body.email
	,	password 	= req.body.password;
	sequelize.query("SELECT email, firstname, lastname, accesstype FROM users_tbl WHERE email='"+email+"' AND password='"+password+"' LIMIT 1 ").success(function(rows) {
		var authentication = null;

		if(rows.length===0) {
			authentication = _.object([
					"isAuthenticated"
				], [
					false
				]);
		} else {
			authentication = _.object([
					"isAuthenticated",
					"email",
					"firstname",
					"lastname",
					"accesstype"
				],[
					true,
					rows[0].email,
					rows[0].firstname,
					rows[0].lastname,
					rows[0].accesstype
				]);
		}

		res.format({
			json: function() {
				res.send(authentication);
			}
		});
	}).error(function(error) {
		console.log("Query Error: " + error);
	});
};