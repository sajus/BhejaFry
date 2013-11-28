/**
 * Sequelize-ORM configuration file
 ***/

var Sequelize = require('sequelize'),
	mysql = require('mysql'),
	config = require("./dbResources"),
	db = config.database;

var sequelize = new Sequelize(db.name, db.host, db.password, {
	/**
	 * custom host; default: localhost
	 ***/
	// host: 'my.server.tld',

	/**
	 * The sql dialect of the database. default is 'mysql'
	 * currently supported: 'mysql', 'sqlite', 'postgres'
	 ***/
	dialect: 'mysql',

	/**
	 * Disable logging; default: console.log
	 ***/
	logging: console.log,

	/**
	 * Specify options, which are used when sequelize.define is called.
	 * Below you can see the possible keys for settings.
	 ***/
	define: {
		engine: 'INNODB',
		charset: 'utf8',
		collate: 'utf8_general_ci',
		timestamps: true,
		paranoid: false,
		syncOnAssociation: true
	}

	/**
	 * Use pooling in order to reduce db connection overload and to increase speed
	 * currently only for mysql and postgresql (since v1.5.0)
	 ***/
	// pool: { maxConnections: 5, maxIdleTime: 30 }
});

exports.sequelize = sequelize;