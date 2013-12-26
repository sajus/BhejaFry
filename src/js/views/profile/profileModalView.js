define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        profileModalTemplate = require('template!templates/profile/profileModal');

    require('bsModal');

    return Backbone.View.extend({
        className: "modal fade",

        render: function() {
            this.$el.html(profileModalTemplate());
            this.uxFormation();
            return this;
        },

        uxFormation: function() {
            this.$el.find('.modal-dialog').css('width', '1000px');
        }
    });
});