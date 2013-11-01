define(function(require) {
    'use strict';

    var Backbone = require('backbone'),
        headerMenuTemplate = require('template!templates/master/header/header');

    require('jqueryCookie');
    require('bsTooltip');
    require('bsDropdown');

    return Backbone.View.extend({

        el: '.mainMenu',

        initialize: function() {
            if ($.cookie('isAuthenticated')) {
                this.accesstype = $.cookie('accesstype');
            }
            this.render();
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
        }
    });

});