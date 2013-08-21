define(['backbone', 'globals', 'modelValidator'], function(Backbone, globals) {

    var ModifyCollection = Backbone.Collection.extend({

		url: function(){
			return globals.gateWayUrl + "/getAllUsers";
		},

		parse: function(response){
			var userlistObj = {};
			var userslistObj = [];
			var self = this;
			var operationHTML = '<button class="btn btn-small btn-primary userEdit" type="button"><i class="icon-edit icon-white"></i> Edit</button>';

			_.each(response.userslist, function(userlist){
				userlist.selectRows = "<input type='checkbox' class='selectrows'>";
				userlist.gender==='M' ? userlist.gender = "Male" : userlist.gender = "Female";
				userlist.status = userlist.status.toLowerCase();
				userlist.status==='active' ? userlist.status = '<span class="label label-success">' + self.capitaliseFirstLetter(userlist.status) + '</span>' : userlist.status = '<span class="label label-inverse">' + self.capitaliseFirstLetter(userlist.status) + '</span>';

				userlistObj = _.object([
					"selectrows",
					"empid",
					"firstname",
					"lastname",
					"email",
					"gender",
					"designation",
					"status",
					"accesslevel",
					"operations"
				],[
					userlist.selectRows,
					userlist.id,
					userlist.firstname,
					userlist.lastname,
					userlist.email,
					userlist.gender,
					userlist.designation,
					userlist.status,
					userlist.accesslevel,
					operationHTML
				]);

				userslistObj.push(userlistObj);
			});

			return userslistObj;
		},

		capitaliseFirstLetter: function(string) {
			return string.charAt(0).toUpperCase() + string.slice(1);
		}
    });

    return ModifyCollection;

});
