define(function(require) {
    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Events = require('events'),
    delIvListModalTemplate = require('template!templates/interviewList/delIvListModal'),
    EditDeleteInterviewModel = require('models/interviewList/editDeleteInterviewModel');
    // InterviewListView = require('views/interviewList/interviewListView');

	return Backbone.View.extend({

		initialize: function() {
            this.editDeleteInterviewModel = new EditDeleteInterviewModel();
            console.log(this.editDeleteInterviewModel);
        },

		className:"modal hide fade",

		id:"deleteModal",

		events: {
			'click #agree': 'agreement',
			'click .confirmDel': 'confirmDelInterview'
		},

		render: function(id){
			this.id = id;
			this.$el.html(delIvListModalTemplate);
			return this;
		},

		agreement: function() {
			$('#agree').prop('checked', function () {
				if (this.checked) {
					$(this).prop("checked", true);
					$('.confirmDel').removeClass('disabled');
				} else {
					$(this).prop("checked", false);
					$('.confirmDel').addClass('disabled');
				}
			});
		},

		confirmDelInterview: function() {
			console.log("Confirm Delete");
			var self = this;
			// this.interviewListView = new InterviewListView();
			$('#agree').prop('checked', function () {
				if (this.checked) {
					self.editDeleteInterviewModel.set({id:self.id});
					self.editDeleteInterviewModel.destroy({
						success: function() {
							self.hide();
							Events.trigger('deleteInterview');
						},
						error: function() {
							Events.trigger("alert:error", [{
						    	message: "Some error got triggered white deleting record"
							}]);
						}
			        });
				}
			});
		},

		hide: function() {
			this.$el.modal('hide');
        }

	});

});
