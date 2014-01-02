define(function(require) {
    'use strict';

    var $ = require('jquery'),
        Backbone = require('backbone'),
        Core = require('core'),
        globals = require('globals'),
        layoutTemplate = require('template!templates/master/layout/layout'),
        ProfileModalView = require('views/profile/profileModalView');

    require('jqueryCookie');

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.render();
        },

        events: {
            'click .editProfile': 'editProfile',
            'click .toggleSidebar': 'toggleSidebar'
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
            var roles = $.cookie('roles');
            if (roles === 'Administrator') {
                roles = true;
            } else {
                roles = false;
            }
            this.$el.html(layoutTemplate({
                username: $.cookie('username'),
                filterByRole: roles
            }));
            this.renderHeader();
            this.renderFooter();

            this.fetchComponentdata();

            return this;
        },

        fetchComponentdata: function() {
            globals.fetchInterviewer();
            globals.fetchMode();
            globals.fetchStatus();
            globals.fetchRounds();
            globals.fetchRecruiter();
        },

        editProfile: function() {
            var profileModalView = new ProfileModalView();
            this.$('.modal-container').html(profileModalView.render().el);
            this.$('.modal-container .modal').modal('show');
        },

        toggleSidebar: function() {
            this.$el.find('.showSidebar').toggle('slow');
        }
    });
});