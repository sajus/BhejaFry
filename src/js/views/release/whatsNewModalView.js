define(function(require) {
    "use strict";

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        whatsNewModalTemplate = require('template!templates/release/whatsNewModal');

    require('jqueryCookie');
    require('bsCollapse');

    return Backbone.View.extend({
        className: "modal fade",

        events: {
            'click #turnItOff': 'turnItOff'
        },

        turnOffCheck: function() {
            var email = _.object([
                'email'
            ], [
                $.cookie('email')
            ]);
            return $.ajax({
                url: "/appRelease",
                type: "post",
                data: email,
                dataType: 'json'
            });
        },

        render: function() {
            this.$el.html(whatsNewModalTemplate);
            this.uxFormation();

            return this;
        },

        uxFormation: function() {
            var view = this;
            this.$el.find('.modal-dialog').css('width', '1000px');
            this.turnOffCheck().done(function(data) {
                if (data.appRelease) {
                    view.$el.find('#turnItOff').prop("checked", true);
                    view.$el.find('.toggleStatus').html('on');
                } else {
                    view.$el.find('#turnItOff').prop("checked", false);
                    view.$el.find('.toggleStatus').html('off');
                }
            });
        },

        turnItOff: function(e) {
            var view = this,
                email = null;
            this.$($(e.target).closest('input[type="checkbox"]')).prop('checked', function() {
                if (this.checked) {
                    view.$(this).prop("checked", true);
                    view.$el.find('.toggleStatus').html('on');
                    email = _.object([
                        'email',
                        'turnOff'
                    ], [
                        $.cookie('email'),
                        true
                    ]);
                    $.ajax({
                        url: "/appRelease",
                        type: "put",
                        data: email,
                        dataType: 'json'
                    }).done(function() {

                    });
                } else {
                    view.$(this).prop("checked", false);
                    view.$el.find('.toggleStatus').html('off');
                    email = _.object([
                        'email',
                        'turnOff'
                    ], [
                        $.cookie('email'),
                        false
                    ]);
                    $.ajax({
                        url: "/appRelease",
                        type: "put",
                        data: email,
                        dataType: 'json'
                    }).done(function() {

                    });
                }
            });
        }
    });
});