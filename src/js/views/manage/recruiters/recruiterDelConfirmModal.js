define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        globals = require('globals'),
        recruiterDelConfirmModal = require('template!templates/manage/recruiters/recruiterDelConfirmModal'),
        Events = require('events');

    require('bsCollapse');

    return Backbone.View.extend({

        className: "modal fade",

        events: {
            'click .agreement': 'agreement',
            'click .confirmDelete': 'confirmDelete'
        },

        render: function(id) {
            this.delid = id;
            this.$el.html(recruiterDelConfirmModal({
                isSingle: (globals.getObjectSize(this.delid) === 1) ? true : false
            }));
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
                type: "delete",
                url: '/recruiter',
                data: view.delid,
                dataType: 'json'
            }).done(function() {
                setTimeout(function() {
                    Events.trigger('deletedRecruiter');
                    view.$el.modal('hide');
                }, 1000);
                Events.trigger("alert:success", [{
                    message: "Recruiter deleted successfully."
                }]);
            }).fail(function() {
                Events.trigger("alert:error", [{
                    message: "Some error got triggered while deleting record."
                }]);
            });
        }
    });
});