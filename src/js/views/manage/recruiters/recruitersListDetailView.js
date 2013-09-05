define(function(require) {

    'use strict';

    var $ = require('jquery'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    Events = require('events'),
    BaseView = require('views/BaseView'),
    recruitersListDetailTemplate = require('template!templates/manage/recruiters/recruitersListDetail');

    require('modelBinder');
    require('modelValidator');
    require('bootstrapAlert');

    return BaseView.extend({

        el: '.page',

        initialize: function() {
            this.modelBinder = new Backbone.ModelBinder();
        },

        render: function () {
            this.$el.html(recruitersListDetailTemplate);

            Backbone.Validation.bind(this, {
                invalid: this.showError,
                valid: this.removeError
            });

            return this;
        }
    });
});
