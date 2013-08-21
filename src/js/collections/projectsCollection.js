define(['backbone', 'models/projectsModel'], function(Backbone, ProjectsModel) {

    var ProjectsCollection = Backbone.Collection.extend({

        model: projectsModel

    });

    return ProjectsCollection;
});
