define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        listDelConfirmModal = require('template!templates/interview/listDelConfirmModal'),
        Events = require('events');

    require('bsCollapse');

    return Backbone.View.extend({

        className: "modal fade",

        events: {
            'click .agreement': 'agreement',
            'click .confirmDelete': 'confirmDelete'
        },

        render: function(cEmail) {
            this.delCEmail = cEmail;
            this.$el.html(listDelConfirmModal);
            return this;
        },

        agreement: function(e) {
            if (this.$(e.target).is(':checked')) {
                this.$(e.target).prop('checked', true);
                this.$el.find('.confirmDelete').removeClass('disabled').prop('disabled', false);
            } else {
                this.$(e.target).prop('checked', false);
                this.$el.find('.confirmDelete').addClass('disabled').prop('disabled', true);
            }
        },

        confirmDelete: function() {
            var view = this;
            $.ajax({
                type: "DELETE",
                url: Backbone.Model.gateWayUrl + '/interviewList/' + this.delCEmail
            }).done(function() {
                setTimeout(function() {
                    Events.trigger('deletedInterview');
                    Events.off('deletedInterview');
                    view.$el.modal('hide');
                }, 1000);
                Events.trigger("alert:success", [{
                    message: "Interview deleted successfully."
                }]);
            }).fail(function() {
                Events.trigger("alert:error", [{
                    message: "Some error got triggered white deleting record."
                }]);
            });
        }
    });
});