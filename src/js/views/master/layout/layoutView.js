define(function(require) {
    'use strict';

    var $ = require('jquery'),
        _ = require('underscore'),
        Backbone = require('backbone'),
        Core = require('core'),
        Events = require('events'),
        layoutTemplate = require('template!templates/master/layout/layout'),
        ProfileModalView = require('views/profile/profileModalView');

    require('jqueryCookie');

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            if ($.cookie('isAuthenticated')) {
                this.email = $.cookie('email');
                this.firstName = $.cookie('firstName');
                this.lastName = $.cookie('lastName');
                this.accesstype = $.cookie('accesstype');
            }
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
                email: this.email,
                username: this.firstName + " " + this.lastName,
                type: this.accesstype
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