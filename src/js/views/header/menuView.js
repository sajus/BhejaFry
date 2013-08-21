define(['backbone', 'template!templates/header/menu','jqueryCookie'], function(Backbone, headerMenuTemplate){

    var HeaderMenuView = Backbone.View.extend({

        el: '.main-menu-container',

        initialize:function(){
            if($.cookie('isAuthenticated')) {
                this.email = $.cookie('email');
            }
        },

        render: function () {
            this.$el.html(headerMenuTemplate({email:this.email}));
        }
    })

    return HeaderMenuView;
});
