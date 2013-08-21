define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var UserModel = Backbone.Model.extend({
		url: function(){
			return globals.gateWayUrl + "/createUsers";
		},
		validation: {
			empid: [{
				required: true,
				msg:'Please enter Employee Id.'
			},{
				pattern: '^[0-9_-]{4,5}$',
				msg: 'Please enter valid Employee Id with atleast 4 digits.'
			}],
			firstname: [{
				required: true,
				msg:'Please enter your First name.'
			},{
				pattern: '^[a-zA-Z]{3,50}$',
				msg: 'Please enter valid name with atleast 3 characters.'
			}],
			lastname: [{
				required: true,
				msg:'Please enter your Last name.'
			},{
				pattern: '^[a-zA-Z]{3,50}$',
				msg: 'Please enter valid name with atleast 3 characters.'
			}],
			email: [{
				required: true,
				msg:'Please enter Email Id.'
			},{
                pattern: '^[a-z0-9_-]{3,15}$',
                msg: 'Please enter valid Email id.'
            }],
            designationid: {
				required: true,
				msg:'Please select Designation.'
			}
        }
    });

    return UserModel;

});
