define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        feedbackModalTemplate = require('template!templates/feedback/feedbackModal');

    require('bsModal');

    return Backbone.View.extend({
        className: "modal fade",

        render: function() {
            this.$el.html(feedbackModalTemplate);
            this.uxFormation();
            return this;
        },

        uxFormation: function() {
            this.$el.find('.modal-dialog').css('width', '1000px');
        }
    });
});