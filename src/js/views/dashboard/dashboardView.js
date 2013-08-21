define(['backbone', 'template!templates/dashboard/dashboard','jqueryCookie'],
    function(Backbone, dashboardTemplate){

    var Dashboard = Backbone.View.extend({

        el: '.page',

        render: function () {
            var self = this;
            this.collection.fetch({
                success: function() {
                    self.$el.html(dashboardTemplate({interviewList: self.collection.toJSON()}));
                }
            });
            return this;
        }
    });

    return Dashboard;
});
