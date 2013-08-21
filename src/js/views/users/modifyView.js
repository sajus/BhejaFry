define(['jquery', 'underscore', 'backbone', 'template!templates/users/modifyUsers', 'views/users/editUserModalView', 'views/users/deleteUserModalView', 'views/users/summaryUserModalView', 'fueluxDataSource', 'fueluxDataGrid','bootstrapDropdown','fueluxComboBox','fueluxSelectBox','fueluxSearchBox'],
	function($, _,Backbone, modifyUsersTemplate, UserEditView, UserDeleteView, UsersSummaryView, FuelUxDataSource){

		var modifyUserPage = Backbone.View.extend({

			el: '#modifyuser',

			render: function(){
				var self = this;
				this.collection.fetch({
					success: function(){
						self.$el.html(modifyUsersTemplate({totalUsers: self.collection.length}));
						self.createDataGrid(self.collection.toJSON());
					}
				});
			},

			events: {
				'click .userEdit': 'userEdit',
				'click .userDelete': 'userDelete',
				'click .summary': 'userTblSummary',
				'click .sendEmail': 'sendEmail',
			},

			createDataGrid: function(userlist){
				var DataSource = new FuelUxDataSource({
					columns: [
						{
							property: "selectrows",
							label: "<input type='checkbox' class='selectAllUsers'>",
							sortable: false
						},
						{
							property: "empid",
							label: "Employee Id",
							sortable: true
						},
						{
							property: "firstname",
							label: "First Name",
							sortable: true
						},
						{
							property: "lastname",
							label: "Last Name",
							sortable: true
						},
						{
							property: "email",
							label: "Email",
							sortable: true
						},
						{
							property: "gender",
							label: "Gender",
							sortable: true
						},
						{
							property: "designation",
							label: "Designation",
							sortable: true
						},
						{
							property: "accesslevel",
							label: "Access Level",
							sortable: true
						},
						{
							property: "status",
							label: "User Status",
							sortable: true
						},
						{
							property: "operations",
							label: "Operations",
							sortable: true
						}
					],
					data: userlist,
					delay: 250
				});

				this.$('#MyGrid').datagrid({
					dataSource: DataSource,
					dataOptions:{
						pageIndex: 0,
						pageSize: 5
					},
					stretchHeight: false
				});
			},

			userEdit: function(e) {
				var userEdit = new UserEditView();
				this.$('.modal-container').html(userEdit.render().el);
        		this.$('#editModal').modal({backdrop:'static'});
			},

			userDelete: function() {
				var userDelete = new UserDeleteView();
				this.$('.modal-container').html(userDelete.render().el);
        		this.$('#deleteModal').modal({backdrop:'static'});
			},

			userTblSummary: function() {
				var usersSummary = new UsersSummaryView();
				this.$('.modal-container').html(usersSummary.render().el);
        		this.$('#summaryModal').modal();
			},

			sendEmail: function() {
				console.log("Send Email");
			}
		});

		return modifyUserPage;

	});
// var id = this.$(e.target).closest('tr').attr('data-id');
//             var name = this.$('tr[data-id='+id+'] td a').closest('tr a').html();