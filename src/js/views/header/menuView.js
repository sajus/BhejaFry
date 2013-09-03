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

        render: function () {
            this.$el.html(headerMenuTemplate({email:this.email}));
        }
    });

});
