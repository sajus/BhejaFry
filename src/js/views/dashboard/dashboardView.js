define(['backbone', 'template!templates/dashboard/dashboard','core','jqueryCookie'],
    function(Backbone, dashboardTemplate, Core){

    var Dashboard = Backbone.View.extend({

        el: '.page',

        render: function () {
            var self = this;
            this.collection.fetch({
                success: function() {
                    console.log(Core);
                    self.$el.html(dashboardTemplate({interviewList: self.collection.toJSON()}));
                }
            });
            return this;
        }
    });

    return Dashboard;
});
