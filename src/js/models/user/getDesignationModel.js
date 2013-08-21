define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var UserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/getAllDesignations";
		},

		parse: function(response) {
			return response.designationslist;
		}
    });

    return UserModel;

});