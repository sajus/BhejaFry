define(function(require) {

    'use strict';

    var Backbone = require('backbone'),
    headerMenuTemplate = require('template!templates/header/menu');

    require('jqueryCookie');

    return Backbone.View.extend({

        el: '.main-menu-container',

        initialize:function(){
            if($.cookie('isAuthenticated')) {
                this.email = $.cookie('email');
            }
        },

        events: {
            'click .masthead li': 'activeTracking'
        },

        render: function () {
            this.$el.html(headerMenuTemplate({email:this.email}));
        },

        activeTracking: function(e) {
            this.$el.find('.masthead li.active').removeClass('active');
            var $target = $(e.target);
            if( $target.parent("li") ) {
                $target.parent().addClass('active');
            }
        }
    });

});
