define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        listDelConfirmModal = require('template!templates/interview/listDelConfirmModal'),
        DeleteInterviewModel = require('models/interview/interviewListDetailModel'),
        Events = require('events');

    require('bsCollapse');

    return Backbone.View.extend({

        className: "modal fade",

        events: {
            'click .confirmDelete': 'confirmDelete'
        },

        render: function(userId) {
            this.delUserId = userId;
            this.$el.html(listDelConfirmModal());
            return this;
        },

        confirmDelete: function() {
            console.log('hide');
            this.$el.modal('hide');
            // var deleteInterviewModel = new DeleteInterviewModel();

            // deleteInterviewModel.set({
            //     id: this.delUserId
            // });

            // deleteInterviewModel.destroy({
            //     success: function() {
            //         Events.trigger("alert:success", [{
            //             message: "Record deleted successfully"
            //         }]);
            //     },
            //     error: function() {
            //         Events.trigger("alert:error", [{
            //             message: "Some error got triggered white deleting record"
            //         }]);
            //     }
            // });
        }
    });
});