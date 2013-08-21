define(['backbone', 'events', 'template!templates/footer/footer'], function(Backbone, Events, footerTemplate){

    var FooterView = Backbone.View.extend({

        el: '.footer',

        render: function () {
          	this.$el.html(footerTemplate);
        }

    });

    return FooterView;
});
