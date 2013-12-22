define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        headerMenuTemplate = require('template!templates/master/header/header'),
        WhatsNewModalView = require('views/release/whatsNewModalView'),
        ChangePassModalView = require('views/login/changePassModalView'),
        FeedbackModalView = require('views/feedback/feedbackModalView'),
        ProfileModalView = require('views/profile/profileModalView');

    require('jqueryCookie');
    require('bsTooltip');
    require('bsModal');
    require('bsDropdown');

    return Backbone.View.extend({

        el: '.mainMenu',

        initialize: function() {
            this.render();
        },

        events: {
            'click .changePass': 'changePass',
            'click .whatsNew': 'whatsNew',
            'click .feedback': 'feedback',
            'click .profile': 'profile'
        },

        render: function() {
            if ($.cookie('isAuthenticated')) {
                var roles = $.cookie('roles');
            }
            if (roles === 'Administrator') {
                roles = true;
            } else {
                roles = false;
            }
            
            this.$el.html(headerMenuTemplate({
                filterByRole: roles
            }));

            this.$el.find('.logout').tooltip({
                title: 'Logout',
                animation: true,
                placement: 'bottom'
            });
            this.$el.find('.setting').tooltip({
                title: 'User setting',
                animation: true,
                placement: 'left'
            });
            this.$el.find('.logout').tooltip({
                title: 'Logout',
                animation: true,
                placement: 'bottom'
            });

            return this;
        },

        changePass: function() {
            this.renderModal(ChangePassModalView);
            this.$el.find('input[name="password"]').focus();
        },

        whatsNew: function() {
            this.renderModal(WhatsNewModalView);
        },

        feedback: function() {
            this.renderModal(FeedbackModalView);
        },

        profile: function() {
            this.renderModal(ProfileModalView);
        },

        renderModal: function(ModalView) {
            var modalView = new ModalView();
            $('.modal-container').html(modalView.render().el);
            $('.modal-container .modal').modal('show');
        }
    });

});