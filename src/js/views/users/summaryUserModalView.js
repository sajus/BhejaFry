define(['jquery', 'backbone', 'template!templates/users/summaryUsersModal'],
	function($, Backbone, summaryUserModalTemplate){

	return Backbone.View.extend({

		className:"modal hide fade",

		id:"summaryModal",

		render: function(){
			this.$el.html(summaryUserModalTemplate);
			return this;
		}

	});

});
