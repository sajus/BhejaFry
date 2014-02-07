define(function(require) {

	'use strict';
	var Backbone = require('backbone'),
	userModel = require('models/users/usersListDetailModel');

	return Backbone.Collection.extend({
		model: userModel,

		url: function() {
			return '/interviewer';
		}
	});
});