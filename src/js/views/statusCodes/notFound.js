define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        notFoundTemplate = require('template!templates/statusCodes/notFound');

    require('css!../../../css/modules/statusCodes/statusCodes.css');

    return Backbone.View.extend({
        el: 'body',

        initialize: function() {
            this.render();
        },

        buildStatusCodeMessage: function() {
            return {
                "statusCode": "404 - Page Not Found",
                "errorDetails": "The requested resource could not be found but may be available again in the future."
            };
        },

        render: function() {
            this.$el.html(notFoundTemplate(this.buildStatusCodeMessage()));
            return this;
        }
    });

});