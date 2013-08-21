define(['backbone','template!templates/defaultAction/404'], function(Backbone, defaultTemplate){

    var DefaultPage = Backbone.View.extend({

        el: '.page',
        render: function () {
        	this.$el.html(defaultTemplate);
        }
    });

    return DefaultPage;
});
