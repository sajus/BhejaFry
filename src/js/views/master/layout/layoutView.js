define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Core = require('core'),
        layoutTemplate = require('template!templates/master/layout/layout'),
        ProfileModalView = require('views/profile/profileModalView');

    require('jqueryCookie');

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.render();
        },

        events: {
            'click .editProfile': 'editProfile'
        },

        renderHeader: function() {
            require(['views/master/header/headerView'], function(HeaderView) {
                Core.create(this, 'HeaderView', HeaderView, {
                    skipAuthCheck: true
                });
            });
        },

        renderFooter: function() {
            require(['views/master/footer/footerView'], function(FooterView) {
                Core.create(this, 'FooterView', FooterView, {
                    skipAuthCheck: true
                });
            });
        },

        render: function() {
            this.$el.html(layoutTemplate({
                email: $.cookie('email'),
                username: $.cookie('username'),
                type: $.cookie('roles')
            }));
            this.renderHeader();
            this.renderFooter();

            return this;
        },

        editProfile: function() {
            var profileModalView = new ProfileModalView();
            this.$('.modal-container').html(profileModalView.render().el);
            this.$('.modal-container .modal').modal('show');
        }
    });
});