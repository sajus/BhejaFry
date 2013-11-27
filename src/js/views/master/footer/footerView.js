define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        footerTemplate = require('template!templates/master/footer/footer');

    return Backbone.View.extend({

        el: '.footer',

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(footerTemplate);
            return this;
        }

    });

});