define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        feedbackModalTemplate = require('template!templates/feedback/feedbackModal');

    require('bsCollapse');

    return Backbone.View.extend({
        className: "modal fade",

        render: function() {
            this.$el.html(feedbackModalTemplate());
            // this.$el.find('.modal-dialog').css('width','1000px');
            return this;
        }
    });
});