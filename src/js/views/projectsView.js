define(['jquery', 'underscore', 'backbone', 'models/projectsModel', 'modelForm'], function($, _, Backbone, Project){
	
    var project = new Project();

    var form = new Backbone.Form({
        model: project
    }).render();

    var projectsPage = Backbone.View.extend({

        el: '.page',

        render: function () {
            this.$el.html(form.el);
        }
    });

    return projectsPage;
});
