var Sequelize = require('sequelize')
, mysql       = require('mysql')
, config 	  = require("./dbresources")
, db 		  = config.database;

var sequelize = new Sequelize(db.name, db.host, db.password, {
    dialect: 'mysql',
    // disable logging; default: console.log
  	logging: false
});

exports.sequelize = sequelize;