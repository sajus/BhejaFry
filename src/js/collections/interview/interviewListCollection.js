define(['backbone', 'models/dashboard/dashboardModel'], function(Backbone, dashboardModel) {

    var DashboardCollection = Backbone.Collection.extend({
    	url: function() {
            return Backbone.Model.gateWayUrl + '/interviewList';
        }
    });

    return DashboardCollection;
});
