define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        headerMenuTemplate = require('template!templates/master/header/header'),
        WhatsNewModalView = require('views/release/whatsNewModalView'),
        ChangePassModalView = require('views/login/changePassModalView'),
        FeedbackModalView = require('views/feedback/feedbackModalView');

    require('jqueryCookie');
    require('bsTooltip');
    require('bsModal');
    require('bsDropdown');

    return Backbone.View.extend({

        el: '.mainMenu',

        initialize: function() {
            if ($.cookie('isAuthenticated')) {
                this.accesstype = $.cookie('accesstype');
            }
            this.render();
        },

        events: {
            'click .changePass': 'changePass',
            'click .whatsNew': 'whatsNew',
            'click .feedback': 'feedback'
        },

        render: function() {
            if (this.accesstype === '1') {
                this.accesstype = true;
            } else {
                this.accesstype = false;
            }
            this.$el.html(headerMenuTemplate({
                type: this.accesstype
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

        renderModal: function(ModalView) {
            var modalView = new ModalView();
            this.$('.modal-container').html(modalView.render().el);
            this.$('.modal-container .modal').modal('show');
        }
    });

});