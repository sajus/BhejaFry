var sequelize = require('../../dbconfig').sequelize
// ,           _ = require('../../libresources').underscore;

exports.getUser = function(req, res){
	sequelize.query("SELECT * FROM users_tbl").success(function(rows) {
		res.format({
			json: function() {
				res.send(rows);
			}
		});
		// res.jsonp(rows);
		// console.log(_.pluck(rows, 'firstname'));
	}).error(function(error) {
		console.log(error);
	});
};

exports.postUser = function(req, res){
	sequelize.query("INSERT INTO users_tbl (firstname,lastname) VALUES ('"+req.body.firstname+"','"+req.body.lastname+"')").success(function(rows) {
		console.log("Record inserted successfully");
	}).error(function(error) {
		console.log(error);
	});
};

exports.putUser = function(req, res){
	sequelize.query("UPDATE users_tbl SET lastname='"+req.body.lastname+"' WHERE empid='"+req.params.id+"'").success(function() {
		console.log("Record updated successfully");
	}).error(function(error) {
		console.log(error);
	});
};

exports.delUser = function(req, res){
	sequelize.query("DELETE FROM users_tbl WHERE empid='"+req.params.id+"'").success(function() {
		console.log("Record deleted successfully");
	}).error(function(error) {
		console.log(error);
	});
};