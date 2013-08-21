define(['jquery', 'backbone', 'template!templates/users/editUserModal', 'models/user/getDesignationModel'],
	function($, Backbone, editUserModalTemplate, DesignationModel){

	return Backbone.View.extend({
		className:"modal hide fade",

		id:"editModal",

		render: function(){
			var self = this;
			this.designationModel = new DesignationModel();
			this.designationModel.fetch({
				success: function() {
					self.$el.html(editUserModalTemplate({designations:self.designationModel.toJSON()}));
				}
			});
			// this.$el.html(editUserModalTemplate);
			return this;
		}

	});

});
