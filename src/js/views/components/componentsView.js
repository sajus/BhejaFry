define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Core = require('core'),
    componentsTemplate = require('template!templates/components/components');

    var ComponentsView = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(componentsTemplate);
        }
    });

    return ComponentsView;
});
