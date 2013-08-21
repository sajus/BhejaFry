define(['backbone','template!templates/defaultAction/accessForbiden'], function(Backbone, accessForbidenTemplate){

    var AccessForbidenPage = Backbone.View.extend({

        el: '.page',
        render: function () {
        	this.$el.html(accessForbidenTemplate);
        }
    });

    return AccessForbidenPage;
});
