/**
 * NPM's configuration setup.
 *
 * By default, we supports underscore & moment in development and production.
 *
 * Support you want to use [underscore] in some another file, Do the following
 * Include it using following Syntax:
 *_ = require('../config/npmResources').underscore;
 *
 */

/**
 * Underscore.js is a utility-belt library for JavaScript that provides
 * support for the usual functional suspects (each, map, reduce, filter...)
 * without extending any core JavaScript objects.
 *
 * More information: https://npmjs.org/package/underscore
 */
var underscore = require('underscore');
exports.underscore = underscore;

/**
 * A lightweight javascript date library for parsing, validating, manipulating, and formatting dates.
 *
 * More information: https://npmjs.org/package/moment
 */
var moment = require('moment');
exports.moment = moment;

/**
 * Memorable password generator.
 *
 * More information: https://npmjs.org/package/password-generator
 */
var keygen = require('password-generator');
exports.keygen = keygen;

/**
 * sql-string is a function library for sql string optimization & part of Sequelize-ORM NPM.
 *
 * More information: https://github.com/sequelize/sequelize/blob/master/lib/sql-string.js
 */
var SqlString = require('sequelize/lib/sql-string');
exports.sqlString = SqlString;