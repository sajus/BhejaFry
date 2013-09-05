define(function(require) {

    'use strict';

    var Backbone = require('backbone'),
    Events = require('events'),
    footerTemplate = require('template!templates/master/footer/footer');

    return Backbone.View.extend({

        el: '.footer',

        render: function () {
          	this.$el.html(footerTemplate);
        }

    });

});
