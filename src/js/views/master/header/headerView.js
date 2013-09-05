define(function(require) {

    'use strict';

    var Backbone = require('backbone'),
    headerMenuTemplate = require('template!templates/master/header/header');

    require('jqueryCookie');

    return Backbone.View.extend({

        el: '.main-menu-container',

        initialize:function(){
            if($.cookie('isAuthenticated')) {
                this.email = $.cookie('email');
                this.accesstype = $.cookie('accesstype');
            }
        },

        events: {
            'click .masthead li': 'activeTracking'
        },

        render: function () {
            if(this.accesstype==='1') {
                this.accesstype=true;
            } else {
                this.accesstype=false;
            }
            this.$el.html(headerMenuTemplate({email:this.email, type: this.accesstype}));
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
