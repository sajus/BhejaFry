define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        whatsNewModalTemplate = require('template!templates/release/whatsNewModal');

    require('bsCollapse');

    return Backbone.View.extend({
        className: "modal fade",

        render: function() {
            this.$el.html(whatsNewModalTemplate());
            this.$el.find('.modal-dialog').css('width','1000px');
            return this;
        }
    });
});