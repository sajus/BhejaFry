define(['backbone','template!templates/defaultAction/workInProgress'], function(Backbone, workInProgressTemplate){

    var WorkInProgressPage = Backbone.View.extend({

        el: '.page',
        render: function () {
        	this.$el.html(workInProgressTemplate);
        }
    });

    return WorkInProgressPage;
});
