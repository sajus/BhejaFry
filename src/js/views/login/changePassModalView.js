define(function(require) {
    "use strict";

    var Backbone = require('backbone'),
        Events = require('events'),
        changePassTemplate = require('template!templates/login/changePassModal');

    require('bsModal');

    return Backbone.View.extend({
        className: "modal fade",

        render: function() {
            this.$el.html(changePassTemplate());
            this.$el.find('.modal-dialog').css('width', '600px');
            return this;
        }
    });
});