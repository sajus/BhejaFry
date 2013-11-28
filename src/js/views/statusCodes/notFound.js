define(function(require) {
    'use strict';

    var _ = require('underscore'),
        Backbone = require('backbone'),
        notFoundTemplate = require('template!templates/statusCodes/notFound');

    require('css!../../../css/modules/statusCodes/statusCodes.css');

    return Backbone.View.extend({
        el: 'body',

        initialize: function() {
            this.render();
        },

        buildStatusCodeMessage: function() {
            return _.object([
                'statusCode',
                'errorDetails'
            ], [
                '404 - Page Not Found',
                'The requested resource could not be found but may be available again in the future.'
            ]);
        },

        render: function() {
            this.$el.html(notFoundTemplate(this.buildStatusCodeMessage()));
            return this;
        }
    });

});