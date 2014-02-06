define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Core = require('core'),
        globals = require('globals'),
        layoutTemplate = require('template!templates/master/layout/layout'),
        ProfileModalView = require('views/profile/profileModalView');

    return Backbone.View.extend({

        el: 'body',

        initialize: function() {
            this.render();
        },

        events: {
            'click .editProfile': 'editProfile',
            'click .toggleSidebar': 'toggleSidebar',
            'mouseover .toggleSidebar': 'uxFormation'
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
            var roles = globals.getAuthUser().roles;
            if (roles === 'Administrator') {
                roles = true;
            } else {
                roles = false;
            }
            this.$el.html(layoutTemplate({
                username: globals.getAuthUser().username,
                filterByRole: roles
            }));
            this.renderHeader();
            this.renderFooter();

            this.fetchComponentdata();

            return this;
        },

        uxFormation: function() {
            this.renderTooltip('.toggleSidebar', 'Show or hide sidebar', 'bottom');
        },

        renderTooltip: function(classes, title, placement) {
            this.$el.find(classes).tooltip({
                title: title,
                animation: true,
                placement: placement
            });
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
            this.$el.find('.showSidebar').toggle();
            this.$el.find('.fullPageView').toggleClass('col-xs-12');
            this.$el.find('.dataTables_scrollHeadInner').css('width', '100%');
            this.$el.find('.dataTable').css('width', '100%');
            this.$el.find('.toggleSidebar').blur();
            this.$el.find('.fa-angle-double-left').toggleClass('fa-angle-double-right');
        }
    });
});