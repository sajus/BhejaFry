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
            return $.ajax({
                url: "\appRelease?email=" + $.cookie('email')
            });
        },

        render: function() {
            var view = this;
            this.$el.html(whatsNewModalTemplate());
            this.$el.find('.modal-dialog').css('width', '1000px');
            this.turnOffCheck().done(function(data) {
                console.log(data);
                if(data.appRelease) {
                    console.log('T');
                    view.$el.find('#turnItOff').prop("checked", true);
                } else {
                    console.log('F');
                    view.$el.find('#turnItOff').prop("checked", false);
                }
            });
            return this;
        },

        turnItOff: function(e) {
            var view = this;
            this.$($(e.target).closest('input[type="checkbox"]')).prop('checked', function() {
                if (this.checked) {
                    view.$(this).prop("checked", true);
                    var email = _.object([
                        'email',
                        'turnOff'
                    ], [
                        $.cookie('email'),
                        true
                    ]);
                    $.ajax({
                        url: "\appRelease",
                        type: "put",
                        data: email,
                        dataType: 'json'
                    }).done(function() {

                    });
                } else {
                    view.$(this).prop("checked", false);
                    var email = _.object([
                        'email',
                        'turnOff'
                    ], [
                        $.cookie('email'),
                        false
                    ]);
                    $.ajax({
                        url: "\appRelease",
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