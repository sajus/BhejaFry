define(['backbone', 'template!templates/dashboard/dashboard','core','jqueryCookie','underscore'],
    function(Backbone, dashboardTemplate, Core){

    /* Handlebars register helper to convert Number to readable text */
    Handlebars.registerHelper('getInterviewer', function(empID) {
        var emp = _.find(Core.globals.interviewer_list, function(interviewer){
            return interviewer.empid == empID;
        })
        return emp.firstname+" "+emp.lastname;
    });

    Handlebars.registerHelper('getRecruiter', function(empID) {
        var emp = _.find(Core.globals.recruiter_list, function(recruiter){
            return recruiter.empid == empID;
        })
        return emp.firstname+" "+emp.lastname;
    });

    Handlebars.registerHelper('getStatus', function(statusID) {
        var stat = _.find(Core.globals.interviewstatus_list, function(status){
            return status.id == statusID;
        })
        return stat.status;
    });

    Handlebars.registerHelper('getRound', function(roundID) {
        var rnd = _.find(Core.globals.interviewrounds_list, function(rounds){
            return rounds.id == roundID;
        })
        return rnd.round;
    });

    Handlebars.registerHelper('getMode', function(modeID) {
        var mod = _.find(Core.globals.interviewmode_list, function(modes){
            return modes.id == modeID;
        })
        return mod.mode;
    });

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
