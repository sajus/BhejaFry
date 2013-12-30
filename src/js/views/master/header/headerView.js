define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        Events = require('events'),
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
            var roles = $.cookie('roles');
            if (roles === 'Administrator') {
                roles = true;
            } else {
                roles = false;
            }

            this.$el.html(headerMenuTemplate({
                filterByRole: roles,
                email: $.cookie('email')
            }));

            this.uxFormation();

            return this;
        },

        uxFormation: function() {
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
            Events.renderModal(ProfileModalView);
        },

        renderModal: function(ModalView) {
            var modalView = new ModalView();
            Events.on('modal:closeModal', this.closeModal, this);
            $('.modal-container').html(modalView.render().el);
            $('.modal-container .modal').modal('show');
        },

        closeModal: function() {
            $('.modal-container .modal').modal('hide');
        }
    });

});